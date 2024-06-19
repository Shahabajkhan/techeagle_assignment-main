const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user_model");
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../models/blacklist_modle");
const userRegistration = async (request, response) => {
  /* receiving  all the using details required  */
  const { name, email, phone, address, password, userType } = request.body;

  /* validating for missing value */
  for (let key in request.body) {
    if (!request.body[key] && request.body[key] !== "userType") {
      return response.send({ message: `${key} is missing` });
    }
  }
  try {
    /* checking that user is already exists or not */
    const isUserExists = await UserModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (isUserExists) {
      return response.status(409).json({ message: "user already exists" });
    }

    /* hashing original password for security purpose */
    const hashedPassword = bcrypt.hashSync(password, 4);

    /* creating new user */
    const newUser = new UserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      userType,
    });
    await newUser.save();
    response
      .status(201)
      .json({ message: "new user created successfully", data: newUser });
  } catch (error) {
    response.status(404).send({ message: error?.message || error });
  }
};

const userLogin = async (request, response) => {
  const { email, phone, password } = request.body;
  try {
    /* checking for user  */
    const isUserExists = await UserModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (!isUserExists) {
      return response.status(401).json({ message: "user not found" });
    }
    if (isUserExists) {
      const isPasswordValid = await bcrypt.compare(
        password,
        isUserExists.password
      );
      if (isPasswordValid) {
        /* generating token for user authentication */
        const jwt_token = jwt.sign(
          { userId: isUserExists._id },
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: "2days",
          }
        );
        const refresh_token = jwt.sign(
          { userId: isUserExists._id },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          {
            expiresIn: "4days",
          }
        );

        response.cookie("jwtToken", jwt_token, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // httpOnly: true,
        });
        response.cookie("refreshToken", refresh_token, {
          maxAge: 4 * 24 * 60 * 60 * 1000,
          // httpOnly: true,
        });

        return response.status(200).json({
          message: "login successful",
          data: isUserExists,
          refresh_token,
          jwt_token,
        });
      } else {
        return response.status(400).json({ message: "wrong password" });
      }
    }
  } catch (error) {
    response.status(404).send({ message: error?.message || error });
  }
};

const userLogout = async (request, response) => {
  
  try {
    const token = request.headers.authorization.split(" ")[1];
    const blacklistedToken =  new Blacklist({ token });
    await blacklistedToken.save();
    return response.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error?.message || error });
  }
};
module.exports = { userRegistration, userLogin, userLogout };
