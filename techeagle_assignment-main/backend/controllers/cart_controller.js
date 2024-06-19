const { CartModel } = require("../models/cart_model");
const { checkMissingField } = require("../utils/validate_missing_field");

const getCartProduct = async (req, res) => {
  const id = req.userId;

  try {
    const data = await CartModel.find({
      userId: id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const addCartProduct = async (req, res) => {
  const { name, image, description, weight, price, _id, quantity } = req.body;
  const userId = req.userId;
  const productValidation = checkMissingField(req.body);

  if (productValidation) {
    res.status(401).json(productValidation);
  }

  try {
    const isProductExists = await CartModel.findByIdAndUpdate(
      { _id: _id },
      { $inc: { quantity: 1 } },
      { new: true }
    );

    if (!isProductExists) {
      const data = new CartModel({
        name,
        image,
        description,
        weight,
        price,
        _id,
        quantity,
        userId,
      });
      await data.save();
      return res
        .status(201)
        .json({ message: "product added successfully", data });
    }
    res.status(201).json({
      message: "product added successfully",
      data: isProductExists,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const updateCartProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log(req.body);
  try {
    const updatedProduct = await CartModel.findOneAndUpdate(
      { _id: id, userId: userId },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const deleteCartProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const deleteProduct = await CartModel.findByIdAndDelete(
      { _id: id },
      { userId: userId }
    );
    if (deleteProduct) {
      res
        .status(200)
        .json({ message: "product deleted successfully", data: deleteProduct });
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const deleteAllCart = async (req, res) => {
  const userId = req.userId;
  try {
    const deletedItem = await CartModel.deleteMany({ userId: userId });
    if (!deletedItem) {
      res.status(400).json({ message: "Item does not exist" });
    } else {
      res.status(200).json({ data: [], message: "Item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};
module.exports = {
  getCartProduct,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
  deleteAllCart,
};
