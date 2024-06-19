const { OrderModel } = require("../models/order_model");

const getPlacedOrder = async (req, res) => {
  const userId = req.userId;
  const role = req.userType;
  try {
    const data =
      role === "customer"
        ? await OrderModel.find({
            userId: userId,
          })
        : await OrderModel.find();
    res.status(200).json({  data: data });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const placeOrder = async (req, res) => {
  const userId = req.userId;
  const payload = req.body;
  if (!payload.length) {
    return res.status(400).json({ message: "No products in the order" });
  }
  const validField = payload.filter((ele) => {
    return (
      !ele.productId ||
      !ele.quantity ||
      !ele.price ||
      !ele.image ||
      !ele.userName ||
      !ele.phone ||
      !ele.userAddress ||
      !ele.name
    );
  });
  if (validField.length) {
    return res.status(400).json({
      message: "Please fill all the required fields",
      data: validField,
    });
  }
  try {
    const order = await OrderModel.create({ products: req.body, userId });
    res.status(201).json({ message: "order placed successfully", data: order });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

const updatePlacedOrder = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const filter = {
      _id: payload.collectionId,
      "products._id": id,
    };

    const update = {
      $set: { "products.$.orderStatus": payload.orderStatus },
    };

    const options = { new: true }; 

    const updatedOrder = await OrderModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    res
      .status(200)
      .json({ message: "updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error?.message || error });
  }
};

module.exports = { placeOrder, getPlacedOrder, updatePlacedOrder };
