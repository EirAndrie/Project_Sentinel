import mongoose from "mongoose";

const PoserAccountSchema = new mongoose.Schema({
  // FOREIGN KEY - Creator (Client)
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Creator",
    required: [true, "Creator ID is required"],
  },
  // FOREIGN KEY - Website
  websiteID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website",
    required: [true, "Website ID is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  profile_url: {
    type: String,
    required: [true, "Profile URL is required"],
  },
  followers_count: {
    type: Number,
    default: 0,
    min: 0,
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

const PoserAccount = mongoose.model("PoserAccount", PoserAccountSchema);
export default PoserAccount;
