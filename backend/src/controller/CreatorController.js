import Creator from "../models/Creator.js";
import User from "../models/User.js";
import Website from "../models/Website.js";

// POST Function to create creator
export const createCreator = async (req, res) => {
  try {
    // Edge Case 1: Required fields are empty
    if (
      !req.body.userID ||
      !req.body.creator_name ||
      !req.body.keywords ||
      !req.body.socials ||
      !req.body.description
    ) {
      console.log("EDGE CASE 1: Fields are empty");
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Edge Case 2: Invalid User ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.body.userID)) {
      console.log("EDGE CASE 2: Invalid User ID");
      return res
        .status(400)
        .json({ message: "Invalid User ID", success: false });
    }

    // Edge Case 3: Referenced User does not exist (FK)
    const userExists = await User.findById(req.body.userID);
    if (!userExists) {
      console.log("EDGE CASE 3: User not found");
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Edge Case 5: Keywords array is empty
    if (req.body.keywords.length === 0) {
      console.log("EDGE CASE 5: Keywords are empty");
      return res
        .status(400)
        .json({ message: "At least one keyword is required", success: false });
    }

    // Edge Case 6: Socials array is empty
    if (req.body.socials.length === 0) {
      console.log("EDGE CASE 6: Socials are empty");
      return res
        .status(400)
        .json({ message: "At least one social is required", success: false });
    }

    // Proceed to create creator after all edge cases are handled
    const creator = await Creator.create(req.body);
    // Increment User Creator Count
    await User.findByIdAndUpdate(req.body.userID, {
      $inc: { creator_count: 1 },
    });

    // Create Website entities for each assigned website URL
    let websitesCreated = 0;
    if (req.body.websites && req.body.websites.length > 0) {
      for (const url of req.body.websites) {
        try {
          // Extract hostname as website_name
          let websiteName;
          try {
            websiteName = new URL(url).hostname;
          } catch {
            websiteName = url;
          }

          // Skip if website already exists
          const existing = await Website.findOne({ base_url: url });
          if (!existing) {
            await Website.create({
              creatorID: creator._id,
              website_name: websiteName,
              base_url: url,
            });
            websitesCreated++;
          }
        } catch (err) {
          console.log(`Skipping website "${url}": ${err.message}`);
        }
      }

      // Update the creator's website_count
      if (websitesCreated > 0) {
        await Creator.findByIdAndUpdate(creator._id, {
          website_count: websitesCreated,
        });
      }
    }

    // Throw success status and message
    console.log(
      `Creator ${creator.creator_name} created successfully with ${websitesCreated} website(s)`,
    );
    res.status(201).json({ creator, success: true });
  } catch (error) {
    console.log(`Error creating creator: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get creator
export const getCreator = async (req, res) => {
  try {
    // Edge Case 1: Invalid User ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid User ID");
      return res
        .status(400)
        .json({ message: "Invalid User ID", success: false });
    }

    // Edge Case 2: Creator not found
    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      console.log("EDGE CASE 2: Creator not found");
      return res
        .status(404)
        .json({ message: "Creator not found", success: false });
    }

    // Throw success status and message
    console.log(`Creator ${creator.creator_name} found successfully`);
    res.status(200).json({ creator, success: true });
  } catch (error) {
    console.log(`Error getting creator: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get all creators belonging to a user
export const getCreatorsByUser = async (req, res) => {
  try {
    // Edge Case 1: Invalid user ID format
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.userID)) {
      console.log("EDGE CASE 1: Invalid user ID");
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    // Edge Case 2: User does not exist
    const userExists = await User.findById(req.params.userID);
    if (!userExists) {
      console.log("EDGE CASE 2: User not found");
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Fetch all creators linked to this user (empty array is valid)
    const creators = await Creator.find({ userID: req.params.userID });

    console.log(
      `Found ${creators.length} creator(s) for user ${userExists.name}`,
    );
    res.status(200).json({ creators, success: true });
  } catch (error) {
    console.log(`Error getting creators by user: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// PATCH Function to update creator
export const updateCreator = async (req, res) => {
  try {
    // Edge Case 1: Invalid Creator ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Creator ID");
      return res
        .status(400)
        .json({ message: "Invalid Creator ID", success: false });
    }

    // Edge Case 2: Creator not found
    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      console.log("EDGE CASE 2: Creator not found");
      return res
        .status(404)
        .json({ message: "Creator not found", success: false });
    }

    // Edge Case 3: Prevent changing userID (immutable relationship)
    if (req.body.userID) {
      console.log("EDGE CASE 3: Cannot change userID");
      return res
        .status(400)
        .json({ message: "Cannot change the associated user", success: false });
    }

    // Edge Case 4: Keywords array is empty (if provided)
    if (req.body.keywords && req.body.keywords.length === 0) {
      console.log("EDGE CASE 4: Keywords are empty");
      return res
        .status(400)
        .json({ message: "At least one keyword is required", success: false });
    }

    // Edge Case 5: Socials array is empty (if provided)
    if (req.body.socials && req.body.socials.length === 0) {
      console.log("EDGE CASE 5: Socials are empty");
      return res
        .status(400)
        .json({ message: "At least one social is required", success: false });
    }

    // Edge Case 6: Description is empty string (if provided)
    if (
      req.body.description !== undefined &&
      req.body.description.trim() === ""
    ) {
      console.log("EDGE CASE 6: Description is empty");
      return res
        .status(400)
        .json({ message: "Description cannot be empty", success: false });
    }

    // Proceed to update creator after all edge cases are handled
    const updatedCreator = await Creator.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      },
    );

    // Throw success status and message
    console.log(`Creator ${updatedCreator.creator_name} updated successfully`);
    res.status(200).json({ updatedCreator, success: true });
  } catch (error) {
    console.log(`Error updating creator: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// DELETE Function to delete creator
export const deleteCreator = async (req, res) => {
  try {
    // Edge Case 1: Invalid Creator ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Creator ID");
      return res
        .status(400)
        .json({ message: "Invalid Creator ID", success: false });
    }

    // Proceed to delete creator (returns the deleted doc or null)
    const deletedCreator = await Creator.findByIdAndDelete(req.params.id);

    // Edge Case 2: Creator not found
    if (!deletedCreator) {
      console.log("EDGE CASE 2: Creator not found");
      return res
        .status(404)
        .json({ message: "Creator not found", success: false });
    }

    // Delete all websites linked to this creator
    await Website.deleteMany({ creatorID: deletedCreator._id });
    // Decrement User Creator Count
    await User.findByIdAndUpdate(deletedCreator.userID, {
      $inc: { creator_count: -1 },
    });

    // Throw success status and message
    console.log(`Creator ${deletedCreator.creator_name} deleted successfully`);
    res.status(200).json({ deletedCreator, success: true });
  } catch (error) {
    console.log(`Error deleting creator: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};
