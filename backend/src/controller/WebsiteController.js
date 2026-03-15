import Website from "../models/Website.js";
import Creator from "../models/Creator.js";

// POST Function to create website
export const createWebsite = async (req, res) => {
  try {
    // Edge Case 1: Required fields are empty
    if (!req.body.creatorID || !req.body.website_name || !req.body.base_url) {
      console.log("EDGE CASE 1: Fields are empty");
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Edge Case 2: Invalid Creator ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.body.creatorID)) {
      console.log("EDGE CASE 2: Invalid Creator ID");
      return res
        .status(400)
        .json({ message: "Invalid Creator ID", success: false });
    }

    // Edge Case 3: Referenced Creator does not exist (FK)
    const creatorExists = await Creator.findById(req.body.creatorID);
    if (!creatorExists) {
      console.log("EDGE CASE 3: Creator not found");
      return res
        .status(404)
        .json({ message: "Creator not found", success: false });
    }

    // Edge Case 4: Website already exists
    const existingWebsite = await Website.findOne({ base_url: req.body.base_url });
    if (existingWebsite) {
      console.log(
        "EDGE CASE 4: Website already exists. Last seen date will be updated.",
      );
      await Website.findByIdAndUpdate(existingWebsite._id, {
        last_seen: Date.now(),
      });
      return res.status(400).json({
        message: "Website already exists. Last seen date updated.",
        success: false,
      });
    }

    // Proceed to create website after all edge cases are handled
    const website = await Website.create(req.body);
    // Increment Creator Website Count
    await Creator.findByIdAndUpdate(req.body.creatorID, {
      $inc: { website_count: 1 },
    });

    // Throw success status and message
    console.log(`Website ${website.website_name} created successfully`);
    res.status(201).json({ website, success: true });
  } catch (error) {
    console.log(`Error creating website: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get website
export const getWebsite = async (req, res) => {
  try {
    // Edge Case 1: Invalid Website ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Website ID");
      return res
        .status(400)
        .json({ message: "Invalid Website ID", success: false });
    }

    // Edge Case 2: Website not found
    const website = await Website.findById(req.params.id);
    if (!website) {
      console.log("EDGE CASE 2: Website not found");
      return res
        .status(404)
        .json({ message: "Website not found", success: false });
    }

    // Throw success status and message
    console.log(`Website ${website.website_name} found successfully`);
    res.status(200).json({ website, success: true });
  } catch (error) {
    console.log(`Error getting website: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get all websites
export const getAllWebsites = async (req, res) => {
  try {
    // Edge Case 1: No websites found
    const websites = await Website.find();
    if (!websites) {
      console.log("EDGE CASE 1: No websites found");
      return res
        .status(404)
        .json({ message: "No websites found", success: false });
    }

    // Throw success status and message
    console.log(`Websites found successfully`);
    res.status(200).json({ websites, success: true });
  } catch (error) {
    console.log(`Error getting websites: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// DELETE Function to delete website
export const deleteWebsite = async (req, res) => {
  try {
    // Edge Case 1: Invalid Website ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Website ID");
      return res
        .status(400)
        .json({ message: "Invalid Website ID", success: false });
    }

    // Edge Case 2: Website not found
    const website = await Website.findById(req.params.id);
    if (!website) {
      console.log("EDGE CASE 2: Website not found");
      return res
        .status(404)
        .json({ message: "Website not found", success: false });
    }

    // Proceed to delete website after all edge cases are handled
    await Website.findByIdAndDelete(req.params.id);
    // Decrement Creator Website Count
    await Creator.findByIdAndUpdate(website.creatorID, {
      $inc: { website_count: -1 },
    });

    // Throw success status and message
    console.log(`Website ${website.website_name} deleted successfully`);
    res
      .status(200)
      .json({ message: "Website deleted successfully", success: true });
  } catch (error) {
    console.log(`Error deleting website: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};
