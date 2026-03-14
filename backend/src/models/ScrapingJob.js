import mongoose from "mongoose";

const ScrapingJobSchema = new mongoose.Schema({
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
  run_timestamp: {
    type: Date,
    default: Date.now,
  },
  accounts_found: {
    type: Number,
    default: 0,
    min: 0,
  },
  content_found: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "running", "completed", "failed"],
  },
});

const ScrapingJob = mongoose.model("ScrapingJob", ScrapingJobSchema);
export default ScrapingJob;
