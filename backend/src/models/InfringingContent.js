import mongoose from "mongoose";

const InfringingContentSchema = new mongoose.Schema({
  // FOREIGN KEY - Poser Account
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoserAccount",
    required: [true, "Account ID is required"],
  },
  post_url: {
    type: String,
    required: [true, "Post URL is required"],
  },
  media_url: {
    type: String,
    default: "",
  },
  content_type: {
    type: String,
    required: [true, "Content type is required"],
    enum: ["image", "video", "text", "story", "reel", "other"],
  },
  caption: {
    type: String,
    default: "",
  },
  date_detected: {
    type: Date,
    default: Date.now,
  },
  last_seen: {
    type: Date,
    default: Date.now,
  },
});

const InfringingContent = mongoose.model(
  "InfringingContent",
  InfringingContentSchema,
);
export default InfringingContent;
