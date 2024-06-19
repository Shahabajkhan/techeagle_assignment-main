const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      userName: { type: String, required: true, trim: true },
      userAddress: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      date: {
        type: Date,
        default: Date.now,
      },
      orderStatus: {
        type: String,
        enum: ["processed", "confirmed", "dispatched", "delivered"],
        default: "processed",
        trim: true,
      },
    },
  ],
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
