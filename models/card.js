// Import Dependencies
const mongoose = require("./connection")

// Create our Cards Model
const {Schema, model} = mongoose

// Make a cards schema
const cardSchema = new mongoose.Schema({
    name: String,
    category: String,
    img: String,
    attribute: String,
    monsterType: String,
    cardType: String,
    cardText: String,
    atk: {type: Number, min: 0},
    def: {type: Number, min: 0}
})

const Card = mongoose.model("Card", cardSchema)

module.exports = Card