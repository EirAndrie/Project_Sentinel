import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema({
  // FOREIGN KEY
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    unique: true,
  },
  creator_name: {
    type: String,
    required: [true, "Creator name is required"],
  },
  keywords: {
    type: [String],
    required: [true, "Keywords are required"],
    validate: {
      validator: (v) => v.length > 0,
      message: "At least one keyword is required",
    },
  },
  socials: {
    type: [String],
    required: [true, "Socials are required"],
    validate: {
      validator: (v) => v.length > 0,
      message: "At least one social is required",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  poser_account_count: {
    type: Number,
    default: 0,
    min: 0,
  },
  website_count: {
    type: Number,
    default: 0,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Creator = mongoose.model("Creator", CreatorSchema);
export default Creator;
