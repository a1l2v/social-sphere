import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-order", requireSignIn, createPaymentOrder);
router.post("/verify-payment", requireSignIn, verifyPayment);

export default router;
