const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../controllers/user_controller");
const express = require("express");
const { authenticate } = require("../middlewares/authenticate_middleware");

const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/logout", authenticate, userLogout);

module.exports = { userRouter };
