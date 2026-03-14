import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      console.error("Error: UNAUTHORIZED: Auth Middleware File");
      return res
        .status(401)
        .json({ message: "Unauthorized: AUTH MIDDLEWARE FILE" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    // Verify if token exists
    if (!token) {
      console.error("Error: UNAUTHORIZED: Auth Middleware File");
      return res
        .status(401)
        .json({ message: "Unauthorized: AUTH MIDDLEWARE FILE" });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    const user = await User.findById(decodedToken.id).select("-password");
    // check if user found and authorized
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }
    // attach database user
    req.user = user;

    console.log("AUTH HEADER:", req.headers.authorization);
    return next(); // Call the next middleware function
  } catch (error) {
    console.error("Error: AuthMiddleware Failed: AUTHMIDDLEWARE FILE");
    return res.status(401).json({
      message: "Error: AuthMiddleware Failed: AUTHMIDDLEWARE FILE",
      error,
    });
  }
};

export default protect;
