import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    club: {
      type: mongoose.ObjectId,
      ref: "Club",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    team_size: {
        type: Number,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);



export default mongoose.model("Event", eventSchema);