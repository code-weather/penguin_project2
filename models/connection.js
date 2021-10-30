// Import Dependencies
require("dotenv").config()
const mongoose = require("mongoose")

// Establish Database Connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo
mongoose.connect(DATABASE_URL, CONFIG)

// Our connection messages
mongoose.connection
.on("open", () => console.log("Connected to mongo"))
.on("close", () => console.log("Disconnected from mongo"))
.on("error", (error) => console(error))

// Export the Connection
module.exports = mongoose