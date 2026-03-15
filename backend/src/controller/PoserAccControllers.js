import PoserAccount from "../models/PoserAccount.js";
import Creator from "../models/Creator.js";
import Website from "../models/Website.js";

// POST Function to create poser account for creator
export const createPoserAccount = async (req, res) => {
  try {
    // Edge Case 1: Required fields are empty
    if (
      !req.body.creatorID ||
      !req.body.websiteID ||
      !req.body.username ||
      !req.body.profile_url
    ) {
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

    // Edge Case 3: Invalid Website ID
    if (!idRegex.test(req.body.websiteID)) {
      console.log("EDGE CASE 3: Invalid Website ID");
      return res
        .status(400)
        .json({ message: "Invalid Website ID", success: false });
    }

    // Edge Case 4: Referenced Creator does not exist (FK)
    const creatorExists = await Creator.findById(req.body.creatorID);
    if (!creatorExists) {
      console.log("EDGE CASE 4: Creator not found");
      return res
        .status(404)
        .json({ message: "Creator not found", success: false });
    }

    // Edge Case 5: Referenced Website does not exist (FK)
    const websiteExists = await Website.findById(req.body.websiteID);
    if (!websiteExists) {
      console.log("EDGE CASE 5: Website not found");
      return res
        .status(404)
        .json({ message: "Website not found", success: false });
    }

    // Edge Case 6: Creator already has a poser account
    const existingPoserAccount = await PoserAccount.findOne({
      creatorID: req.body.creatorID,
    });
    if (existingPoserAccount) {
      console.log(
        "EDGE CASE 6: Creator already has a poser account. Last seen date will be updated.",
      );
      await PoserAccount.findByIdAndUpdate(existingPoserAccount._id, {
        last_seen: Date.now(),
      });
      return res.status(400).json({
        message: "Creator already has a poser account. Last seen date updated.",
        success: false,
      });
    }

    // Proceed to create poser account after all edge cases are handled
    const poserAccount = await PoserAccount.create(req.body);
    // Increment Creator Poser Account Count
    await Creator.findByIdAndUpdate(req.body.creatorID, {
      $inc: { poser_account_count: 1 },
    });

    // Throw success status and message
    console.log(`Poser Account ${poserAccount.username} created successfully`);
    res.status(201).json({ poserAccount, success: true });
  } catch (error) {
    console.log(`Error creating poser account: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get poser account
export const getPoserAccount = async (req, res) => {
  try {
    // Edge Case 1: Invalid Poser Account ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Poser Account ID");
      return res
        .status(400)
        .json({ message: "Invalid Poser Account ID", success: false });
    }

    // Edge Case 2: Poser Account not found
    const poserAccount = await PoserAccount.findById(req.params.id);
    if (!poserAccount) {
      console.log("EDGE CASE 2: Poser Account not found");
      return res
        .status(404)
        .json({ message: "Poser Account not found", success: false });
    }

    // Throw success status and message
    console.log(`Poser Account ${poserAccount.username} found successfully`);
    res.status(200).json({ poserAccount, success: true });
  } catch (error) {
    console.log(`Error getting poser account: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get all poser accounts
export const getAllPoserAccounts = async (req, res) => {
  try {
    // Edge Case 1: No poser accounts found
    const poserAccounts = await PoserAccount.find();
    if (!poserAccounts) {
      console.log("EDGE CASE 1: No poser accounts found");
      return res
        .status(404)
        .json({ message: "No poser accounts found", success: false });
    }

    // Throw success status and message
    console.log(`Poser Accounts found successfully`);
    res.status(200).json({ poserAccounts, success: true });
  } catch (error) {
    console.log(`Error getting poser accounts: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// DELETE Function to delete poser account
export const deletePoserAccount = async (req, res) => {
  try {
    // Edge Case 1: Invalid Poser Account ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid Poser Account ID");
      return res
        .status(400)
        .json({ message: "Invalid Poser Account ID", success: false });
    }

    // Edge Case 2: Poser Account not found
    const poserAccount = await PoserAccount.findById(req.params.id);
    if (!poserAccount) {
      console.log("EDGE CASE 2: Poser Account not found");
      return res
        .status(404)
        .json({ message: "Poser Account not found", success: false });
    }

    // Proceed to delete poser account after all edge cases are handled
    await PoserAccount.findByIdAndDelete(req.params.id);
    // Decrement Creator Poser Account Count
    await Creator.findByIdAndUpdate(poserAccount.creatorID, {
      $inc: { poser_account_count: -1 },
    });

    // Throw success status and message
    console.log(`Poser Account ${poserAccount.username} deleted successfully`);
    res
      .status(200)
      .json({ message: "Poser Account deleted successfully", success: true });
  } catch (error) {
    console.log(`Error deleting poser account: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};
