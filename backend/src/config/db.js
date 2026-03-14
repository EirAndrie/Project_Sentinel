import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO DB Connected Successfully: DB Config File");
  } catch (error) {
    console.error("Error: Failed to Connect MONGODB: DB config File", error);
  }
};

export default connectDB;
