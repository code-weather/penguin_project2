///////////////////////
// Import Dependencies
///////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

///////////////////////
// Create Router
///////////////////////
const router = express.Router()

////////////////////////
// ROUTES
////////////////////////

// The Signup Routes (Get => Form, Post => form submit)
// "/user/signup"
router.get("/signup", (req, res) => {
    res.render("user/signup.liquid")
})

// router.post("/signup", (req, res) => {
//     res.send("signup")
// })
router.post("/signup", async (req, res) => {
    // Encrypt password
    req.body.password = await bcrypt.hash(req.body.password,
    await bcrypt.genSalt(10))

    // Save the user to our database
    User.create(req.body)
    .then((user) => {
        // Log the user as a test
        console.log(user)
        // Redirect user to login
        res.redirect("/user/login")
    })
    // Error handling
    .catch((error) => {
        res.json({error})
    })
})

// The login Routes (Get => Form, Post => form submit)
// "/user/login"
router.get("/login", (req, res) => {
    res.render("user/login.liquid")
})

// router.post("/login", (req, res) => {
//     res.send("login")
// })
router.post("/login", async (req, res) => {
    // Destructure username and password from req.body
    const {username, password} = req.body

    // Search for the user
    User.findOne({username})
    .then(async (user) => {
        // Check if the user exists
        if(user){
            // Compare passwords
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                // redirect to fruits index page
                // res.redirect("/fruits")
                // store some data in the session object
                req.session.username = username
                req.session.loggedIn = true
                // redirect to fruits index page
                res.redirect("/cards");
        } else {
                res.json({error: "Password doesn't match"})
            }
        } else {
            // Send error that user doesn't exist
            res.json({error: "User doesn't exist"})
        }
    })
    // Error handling
    .catch((error) => {
        res.json({error})
    })
})

// Logout route, get request to /user/logout
router.get("/logout", (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        // Send user back to main page
        res.redirect("/")
    })
})

//////////////////////////////
// Export the router
//////////////////////////////
module.exports = router