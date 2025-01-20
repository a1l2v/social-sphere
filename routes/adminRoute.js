import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Admin-only route to fetch all users
router.get("/users", getAllUsers);

export default router;