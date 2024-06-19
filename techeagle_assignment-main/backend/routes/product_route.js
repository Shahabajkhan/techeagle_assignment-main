const express = require("express");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controller");
const { authenticate } = require("../middlewares/authenticate_middleware");
const { authorized } = require("../middlewares/authorized_middleware");

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.post("/", authenticate, authorized("manager"), addProduct);
productRouter.patch("/:id", authenticate, authorized("manager"), updateProduct);
productRouter.delete(
  "/:id",
  authenticate,
  authorized("manager"),
  deleteProduct
);

module.exports = { productRouter };
