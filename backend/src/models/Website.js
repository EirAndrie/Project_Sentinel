import mongoose from "mongoose";

const WebsiteSchema = new mongoose.Schema({
  // FOREIGN KEY
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Creator",
    required: [true, "Creator ID is required"],
  },
  website_name: {
    type: String,
    required: [true, "Website name is required"],
  },
  base_url: {
    type: String,
    required: [true, "Base URL is required"],
    unique: true,
  },
  scraping_enabled: {
    type: Boolean,
    default: false,
  },
  scraping_frequency: {
    type: Number,
    default: 24, // in hours
    min: 1,
  },
  last_seen: {
    type: Date,
    default: Date.now,
  },
});

const Website = mongoose.model("Website", WebsiteSchema);
export default Website;
