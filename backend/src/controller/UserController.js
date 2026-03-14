import User from "../models/User.js";

// GET Function to create user
export const createUser = async (req, res) => {
  try {
    // Edge Case 1: Fields are empty
    if (!req.body.name || !req.body.email || !req.body.password) {
      console.log("EDGE CASE 1: Fields are empty");
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Edge Case 2: Email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("EDGE CASE 2: Email already exists");
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    // Edge Case 3: Password is too short
    if (req.body.password.length < 6) {
      console.log("EDGE CASE 3: Password is too short");
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // Edge Case 4: Invalid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      console.log("EDGE CASE 4: Invalid email format");
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    // Proceed to create user after all edge cases are handled
    const user = await User.create(req.body);

    // Throw Success Status and
    console.log(`User ${user.name} created successfully`);
    res.status(201).json({ user, success: true });
  } catch (error) {
    console.log(`Error creating user: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// GET Function to get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Edge Case 1: User not found
    if (!user) {
      console.log("EDGE CASE 1: User not found");
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Edge Case 2: Invalid user ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 2: Invalid user ID");
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    // Throw Success Status and
    console.log(`User ${user.name} found successfully`);
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(`Error getting user: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// PATCH Function to update user
export const updateUser = async (req, res) => {
  try {
    // Edge Case 1: Invalid user ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 1: Invalid user ID");
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    // Edge Case 2: Email already exists (exclude current user)
    if (req.body.email) {
      const existingUser = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });
      if (existingUser) {
        console.log("EDGE CASE 2: Email already exists");
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }
    }

    // Edge Case 3: Password is too short
    if (req.body.password && req.body.password.length < 6) {
      console.log("EDGE CASE 3: Password is too short");
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // Edge Case 4: Invalid email format
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        console.log("EDGE CASE 4: Invalid email format");
        return res
          .status(400)
          .json({ message: "Invalid email format", success: false });
      }
    }

    // Proceed to update user after all edge cases are handled
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    // Edge Case 5: User not found
    if (!user) {
      console.log("EDGE CASE 5: User not found");
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Throw Success Status
    console.log(`User ${user.name} updated successfully`);
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(`Error updating user: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};

// DELETE Function to delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // Edge Case 1: User not found
    if (!user) {
      console.log("EDGE CASE 1: User not found");
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Edge Case 2: Invalid user ID
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(req.params.id)) {
      console.log("EDGE CASE 2: Invalid user ID");
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    // Throw Success Status and
    console.log(`User ${user.name} deleted successfully`);
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(`Error deleting user: ${error.message}`);
    res.status(500).json({ message: error.message, success: false });
  }
};
