import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createOrderController} from "../controllers/paymentController.js";
const router = express.Router();

router.post(
  "/create-order",
  requireSignIn,
  createOrderController);

export default router;