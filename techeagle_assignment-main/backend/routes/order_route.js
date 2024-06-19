const express = require("express");
const { authenticate } = require("../middlewares/authenticate_middleware");
const {
  placeOrder,
  getPlacedOrder,
  updatePlacedOrder,
} = require("../controllers/order_controller");
const { authorized } = require("../middlewares/authorized_middleware");

const orderRouter = express.Router();

orderRouter.post("/", authenticate, authorized("customer"), placeOrder);
orderRouter.get(
  "/",
  authenticate,
  authorized("customer", "manager"),
  getPlacedOrder
);
orderRouter.patch(
  "/:id",
  authenticate,
  authorized( "manager"),
  updatePlacedOrder
);

module.exports = { orderRouter };
