import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default in queries
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    profile_img: {
      type: String,
      default: "https://via.placeholder.com/150", // Default avatar
    },
    creator_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Hash password before saving
UserSchema.pre("save", async function () {
  // Only hash if password is modified or new
  if (!this.isModified("password")) {
    return;
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("ERROR generating hash password: USER model file");
    throw error;
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Method to get user without sensitive data
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password from response
  return user;
};

// Static method to find user by credentials
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const User = mongoose.model("User", UserSchema);
export default User;
