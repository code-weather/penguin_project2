////////////////////////////
// Import Dependencies
////////////////////////////
// Import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

////////////////////////////
// Create our Fruits Model
////////////////////////////
// Destructuring Schema and model from mongoose
const {Schema, model} = mongoose
// ...Same as...
// const Schema = mongoose.Schema
// const model = mongoose.Model

// Make a fruits schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// Make a Fruit Model
const User = model("User", userSchema)

// Log the model to make sure it exists
// console.log(Fruit)

////////////////////////////
// Export the User model
////////////////////////////
module.exports = User