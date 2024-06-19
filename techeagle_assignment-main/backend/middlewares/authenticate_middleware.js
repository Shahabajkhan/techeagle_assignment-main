const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user_model");
const { Blacklist } = require("../models/blacklist_modle");

require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  try {
    const isBlacklisted = await Blacklist.findOne({ token });
    // console.log(isBlacklisted,"FROM SUTO");
    if (isBlacklisted) {
      return res.status(401).send("Token is blacklisted");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const { userId } = decodedToken;
    const user = await UserModel.findOne({ _id: userId });
    const role = user?.userType;
    req.userType = role;
    req.userId = userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "unauthorized", error: error?.message || error });
  }
};

module.exports = { authenticate };
