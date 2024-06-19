const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  weight: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  quantity: { type: Number,  trim: true, default: 1 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
