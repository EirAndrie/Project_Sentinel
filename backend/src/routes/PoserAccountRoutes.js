import express from "express";
import {
  createPoserAccount,
  getPoserAccount,
  getAllPoserAccounts,
  deletePoserAccount,
} from "../controller/PoserAccControllers.js";

const router = express.Router();

router.post("/create-poser-account", createPoserAccount); // Functional
router.get("/get-poser-account/:id", getPoserAccount); // Functional
router.get("/get-all-poser-accounts", getAllPoserAccounts); // Functional
router.delete("/delete-poser-account/:id", deletePoserAccount); // Functional

export default router;
