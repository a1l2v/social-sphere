import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    const { cart ,price} = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty or not provided" });
    }

    // Extract the event IDs from the cart array
    const productIds = cart.map((item) => item.event);

    // Create a new order
    const order = await new orderModel({
      products: productIds, // Pass the array of ObjectId
      payment_status: false,
      buyer: req.user._id,
      price:price // Assuming req.user contains the authenticated user's details
    }).save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Controller to get the order and its price
export const getOrderController = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
      }
  
      // Find the order by ID
      const order = await orderModel.findById(orderId).select("price");
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      // Respond with the price of the order
      res.status(200).json({
        success: true,
        price: order.price,
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching order",
        error: error.message,
      });
    }
  };
