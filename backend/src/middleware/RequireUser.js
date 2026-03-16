// Require for User
const requireUser = (req, res, next) => {
  // Check if user exists
  if (!req.user) {
    console.log("ERROR: User does not exist");
    return res
      .status(401)
      .json({ message: "ERROR: Unauthorized user does not exist" });
  }
  // Check if user has a role
  const role = req.user.role;
  // Allow any authenticated user
  if (role === "Admin") {
    return res.status(403).json({
      message: "Forbidden: USER REQUIRED MIDDLEWARE FILE",
    });
  }
  return next();
};

export default requireUser;
