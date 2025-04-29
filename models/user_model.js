const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Role Schema
const roleSchema = new mongoose.Schema({
  roleId: { type: Number, unique: true },
  roleName: String,
});

const Role = mongoose.model("Role", roleSchema);

// User Schema
const userSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  Subjects: Array,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  name: String,
  mobileNo: String,
  email: String,
  resetToken: String,
  resetTokenExpiration: Date,
  forcePasswordChange: { type: Boolean, default: false },
  roleId: { type: Number, required: true }, // Role ID instead of referencing Role model directly
  userProfileImage: String,
  is_active: {
    type: Boolean,
    default: true, // You can set the default value to true (active) when a new user is created
  },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User, Role };
