// Import Dependencies
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const path = require("path")
const CardsRouter = require("./controllers/card")
const UserRouter = require("./controllers/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")

// Create app with object, configure liquid
// Import liquid
const liquid = require("liquid-express-views")

// Construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")

// Create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root:viewsFolder})

// Register Our Middleware
// Ability to override request methods
app.use(methodOverride("_method"))

// Ability to parse urlencoded from for submission
app.use(express.urlencoded({extended: true}))

// Setup our public folder to serve files statically
app.use(express.static("public"))

// Middleware to create sessions (req.session)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false,
    saveUnitiatialized: true
}))

// Routes
app.get("/", (req, res) => {
    res.render("index.liquid")
})

app.use("/cards", CardsRouter)

app.use("/user", UserRouter)


// Setup Server Listener
const port = process.env.PORT
app.listen(port, () =>  console.log(`Listening on port ${port}`))