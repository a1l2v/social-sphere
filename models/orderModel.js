import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: Object,
      },
    ],
    payment_status:{
      type: Boolean,
      default:false,
    }, 
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    price:{
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);