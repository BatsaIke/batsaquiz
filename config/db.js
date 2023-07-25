const mongoose = require("mongoose");
const config = require("config");
const dotenv = require('dotenv');
// Load environment variables from .env.json
dotenv.config();

const connectDB = async () => {
try {
    await mongoose.connect(process.env.mongoURI)
    console.log("database connection established")
} catch (error) {
    console.error(error.message);
    process.exit(1)
}
}

module.exports = connectDB

