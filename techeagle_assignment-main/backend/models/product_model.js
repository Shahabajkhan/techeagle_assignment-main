const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  weight: { type: Number, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
