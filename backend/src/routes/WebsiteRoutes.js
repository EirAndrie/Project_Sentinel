import express from "express";
import {
  createWebsite,
  getWebsite,
  getAllWebsites,
  getWebsitesByCreator,
  getWebsitesByUser,
  deleteWebsite,
} from "../controller/WebsiteController.js";

const router = express.Router();

router.post("/create-website", createWebsite); // Functional
router.get("/get-website/:id", getWebsite); // Functional
router.get("/get-all-websites", getAllWebsites); // Functional
router.get("/get-websites-by-creator/:creatorID", getWebsitesByCreator); // Functional
router.get("/get-websites-by-user/:userID", getWebsitesByUser); // Functional
router.delete("/delete-website/:id", deleteWebsite); // Functional

export default router;
