import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
// File imports
import connectDB from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
const isProduction = process.env.NODE_ENV === "production";
console.log(`Mode: ${isProduction ? "Production" : "Development"}`);
app.use(express.json());
// Run this if not production
if (!isProduction) {
  app.use(
    cors({
      origin: process.env.FR_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    }),
  );
  console.log(`CORS: ${process.env.FR_ORIGIN} Running in Development Mode`);
  // Run this if production
} else {
  app.use(
    cors({
      origin: process.env.FR_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    }),
  );
  console.log(`CORS: ${process.env.FR_ORIGIN} Running in Production Mode`);
}

// Routes
app.use("/", UserRoutes);

// Check if project runs on production or development
if (isProduction) {
  const frontendPath = path.join(__dirname, "../frontend");
  app.use(express.static(frontendPath));

  // SPA callback for all non-API Routes
  app.get(/.*/, (req, res) => {
    // Only serve index.html for GET requests that don't match static files or API routes
    if (!req.url.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      res.status(404).json({ message: "API endpoint not found" });
    }
  });
} else {
  console.log("App running in Development mode");
  app.get("/", (req, res) => {
    res.send("API running successfully...");
  });
}

// MongoDB Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error: MongoDB Connection Failed", error);
  });
