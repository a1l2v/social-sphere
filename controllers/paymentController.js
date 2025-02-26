import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Step 1: Create Order and Generate Razorpay Order ID
 */
export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Validate Order ID
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    // Fetch Order Details
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // If Order is Already Paid
    if (order.payment_status) {
      return res.status(400).json({ success: false, message: "Order is already paid" });
    }

    // Create Razorpay Order
    const options = {
      amount: order.price * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${orderId}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Send Response to Frontend
    res.status(200).json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: order.price,
      key_id: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Error creating payment order", error: error.message });
  }
};

/**
 * Step 2: Handle Payment Success and Update Order Status
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ success: false, message: "Invalid Payment Data" });
    }

    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Update Order Payment Status
    const order = await orderModel.findByIdAndUpdate(orderId, { payment_status: true }, { new: true });

    res.status(200).json({ success: true, message: "Payment successful", order });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
  }
};
