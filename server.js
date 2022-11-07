const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { DB_HOST, PORT } = process.env;

async function main() {
  try {
    if (!DB_HOST) {
      throw new Error("DB_HOST not set!");
    }
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`
      );
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
