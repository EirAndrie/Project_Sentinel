import express from "express";
import {
  createWebsite,
  getWebsite,
  getAllWebsites,
  deleteWebsite,
} from "../controller/WebsiteController.js";

const router = express.Router();

router.post("/create-website", createWebsite); // Functional
router.get("/get-website/:id", getWebsite); // Functional
router.get("/get-all-websites", getAllWebsites); // Functional
router.delete("/delete-website/:id", deleteWebsite); // Functional

export default router;
