const { ProductModel } = require("../models/product_model");
const { checkMissingField } = require("../utils/validate_missing_field");

const getProduct = async (_req, res) => {
  try {
    const data = await ProductModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const addProduct = async (req, res) => {
  const { name, image, description, weight, stock, price } = req.body;
  const productValidation = checkMissingField(req.body);
  if (productValidation) {
    res.status(401).json(productValidation);
  }
  try {
    const newProduct = await new ProductModel({
      name,
      image,
      description,
      weight,
      stock,
      price,
    }).save();
    res
      .status(200)
      .json({ message: "product added successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
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


const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete({ _id: id });
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
module.exports = { getProduct, addProduct, updateProduct, deleteProduct };
