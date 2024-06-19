const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    if (mongoose.connection.readyState != 1) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connected successfully");
    } else {
      console.log("Database already connected");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { DbConnection };
