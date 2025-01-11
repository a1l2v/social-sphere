import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createOrderController,getOrderController} from "../controllers/orderController.js";
const router = express.Router();

router.post(
  "/create-order",
  requireSignIn,
  createOrderController
);
router.get(
    "/get-order/:orderId",
    requireSignIn,
    getOrderController
  );

export default router;