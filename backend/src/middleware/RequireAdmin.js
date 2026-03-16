// For Admins
const requireAdmin = (req, res, next) => {
  // For debugging
  console.log("DEBUG: RequireAdmin hit. User:", req.user);
  const isEnvAdmin = req.user.role === "Admin";
  console.log("DEBUG: isEnvAdmin:", isEnvAdmin);

  if (!req.user || req.user.role !== "Admin") {
    console.log("UNAUTHORIZED: Admin Required");
    return res.status(403).json({ message: "Admin required" });
  }
  return next();
};

export default requireAdmin;
