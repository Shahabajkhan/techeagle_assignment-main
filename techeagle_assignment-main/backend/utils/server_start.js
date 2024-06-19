const { DbConnection } = require("../database config/db");

const startServer = async () => {
  try {
    await DbConnection();
    console.log(`Server is running at port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { startServer };
