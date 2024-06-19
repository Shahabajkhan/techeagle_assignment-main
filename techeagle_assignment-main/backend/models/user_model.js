const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50,
    trim: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email format",
    },
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    maxlength: 10,
    trim: true,
    validate: {
      validator: (value) => /^[6-9]\d{9}$/.test(value),
      message: "Invalid phone number",
    },
  },
  name: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  password: { type: String, required: true, trim: true },
  userType: {
    type: String,
    enum: ["customer", "manager"],
    required: true,
    default: "customer",
    trim: true,
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
