import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Log in functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check fields if empty
    if (!email || !password) {
      console.log("ERROR: All Fields must not be empty");
      return res.status(401).json({
        message: "ERROR: Email and password are required",
      });
    }

    // ADMIN login logic
    if (
      email === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "Admin" }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      console.log("SUCCESS: Admin login successful");
      return res.status(200).json({
        message: "SUCCESS: Login Successful(ADMIN AUTHORIZED)",
        token,
        role: "Admin",
      });
    }

    // Find user and explicitly select password
    const user = await User.findOne({ email }).select("+password");
    // check if user exists
    if (!user) {
      console.log("ERROR: User does not exist");
      return res.status(401).json({
        message: "Error: Invalid credentials",
      });
    }

    // Add debug logging
    console.log("User found, password exists:", !!user.password);
    // Check if password exists on user object
    if (!user.password) {
      console.log("ERROR: User password not found in database");
      return res.status(500).json({
        message: "Error: User data corrupted",
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Error: Invalid Password");
      return res.status(401).json({
        message: "Error: Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
    );

    // Throw success status and message
    console.log("LOGIN DEBUG - User authenticated:", user.email);
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user, // toJSON method will remove password
    });
  } catch (error) {
    console.log("ERROR: Failed to log in:", error);
    res.status(500).json({
      message: "Error: Failed to Log in",
      error: error.message,
    });
  }
};

export default login;
