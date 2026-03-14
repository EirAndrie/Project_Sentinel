import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.post("/create-user/profile", createUser); // Functional
router.get("/get-user/profile/:id", getUser); // Functional
router.patch("/update-user/profile/:id", updateUser); // Functional
router.delete("/delete-user/profile/:id", deleteUser); // Functional

export default router;
