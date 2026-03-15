import express from "express";
import {
  createCreator,
  getCreator,
  updateCreator,
  deleteCreator,
} from "../controller/CreatorController.js";

const router = express.Router();

router.post("/create-creator/profile", createCreator); // Functional
router.get("/get-creator/profile/:id", getCreator); // Functional
router.patch("/update-creator/profile/:id", updateCreator); // Functional
router.delete("/delete-creator/profile/:id", deleteCreator); // Functional

export default router;
