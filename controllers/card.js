// Import dependencies
const express = require("express")
const Card = require("../models/card.js")

// Create router
const router = express.Router()

// Router Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")
    }
})

// Index route
router.get("/", (req, res) => {
    // Find all the fruits
    // Fruit.find({})
    Card.find({username: req.session.username})
    .then((cards) => {
        // Render the index template with the fruits
        res.render("cards/index.liquid", {cards})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

// New route
router.get("/new", (req, res) => {
    res.render("cards/new.liquid")
})

// Create
router.post("/", (req, res) => {
    Card.create(req.body)
    .then((card) => {
        res.redirect("/cards")
    })
    .catch((error) => {
        res.json({error})
    })
})

// Edit route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id

    Card.findById(id)
    .then((card) => {
        res.render("cards/edit.liquid", {card})
    })
    .catch((error) => {
        res.json({error})
    })
})

// Destroy route
router.delete("/:id", (req, res) => {
    const cardId = req.params.id

    Card.findByIdAndRemove(cardId)
    .then((card) => {
        res.redirect("/cards")
    })
     // error handling
    .catch((error) => {
        res.json({error})
    })
})

// Update route
router.put("/:id", (req, res) => {
    const id = req.params.id

    Card.findByIdAndUpdate(id, req.body, {new: true})
    .then((card) => {
        res.redirect("/cards")
    })
     // error handling
    .catch((error) => {
        res.json({error})
    })
})

// Show
router.get("/:id", (req, res) => {
    const id = req.params.id

    Card.findById(id)
    .then((card) => {
        res.render("cards/show.liquid", {card})
    })
    .catch((error) => {
    res.json({error})
    })
})

module.exports = router