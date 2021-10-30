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

// app.get("/", (req, res) => {
//     res.send("Nice! The server works")
// })

// // Cards routes
// // Seed route
// const cardCollection = [
//     {
//         name: "Dark Magician",
//         category: "Monster",
//         img: "https://uploads2.yugioh.com/card_images/257/detail/Dark-Magician.jpg?1375127294",
//         attribute: "Dark",
//         monsterType: "Spellcaster",
//         cardType: "Normal Monster",
//         cardText: "The ultimate wizard in terms of attack and defense",
//         atk: 2500,
//         def: 2100
//     },
//     {
//         name: "Blue-Eyes White Dragon",
//         category: "Monster",
//         img: "https://uploads3.yugioh.com/card_images/247/detail/Blue-Eyes-White-Dragon.jpg?1375127037",
//         attribute: "Light",
//         monsterType: "Dragon",
//         cardType: "Normal",
//         cardText: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
//         atk: 3000,
//         def: 2500
//     },
//     {
//         name: "Time Wizard",
//         category: "Monster",
//         img: "https://uploads4.yugioh.com/card_images/296/detail/Time-Wizard.jpg?1375128576",
//         attribute: "Light",
//         monsterType: "Spellcaster",
//         cardType: "Effect",
//         cardText: "Once per turn: You can toss a coin and call it. If you call it right, destroy all monsters your opponent controls. If you call it wrong, destroy as many monsters you control as possible, and if you do, take damage equal to half the total ATK those destroyed monsters had while face-up on the field.",
//         atk: 500,
//         def: 400
//     },
//     {
//         name: "Kuriboh",
//         category: "Monster",
//         img: "https://uploads1.yugioh.com/card_images/275/detail/Kuriboh.jpg?1375127846",
//         attribute: "Dark",
//         monsterType: "Fiend",
//         cardType: "Effect",
//         cardText: "During damage calculation, if your opponent's monster attacks (Quick Effect): You can discard this card; you take no battle damage from that battle.",
//         atk: 300,
//         def: 200
//     },
//     {
//         name: "Harpie Lady Sisters",
//         category: "Monster",
//         img: "https://uploads4.yugioh.com/card_images/8/detail/harpie-lady-sisters_480x480.jpg?1372281140",
//         attribute: "Wind",
//         monsterType: "Winged Beast",
//         cardType: "Effect",
//         cardText: 'Cannot be Normal Summoned/Set. Must first be Special Summoned with "Elegant Egotist".',
//         atk: 1950,
//         def: 2100
//     },
//     {
//         name: "Dark Hole",
//         category: "Spell",
//         img: "https://uploads2.yugioh.com/card_images/4802/detail/Dark-Hole-YO_0336.jpg?1395076237",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "Destroy all monsters on the field.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Change of Heart",
//         category: "Spell",
//         img: "https://uploads4.yugioh.com/card_images/3354/detail/4369.jpg?1385128059",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "Target 1 monster your opponent controls; take control of it until the End Phase.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Mystic Box",
//         category: "Spell",
//         img: "https://uploads4.yugioh.com/card_images/2972/detail/4658.jpg?1385127325",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "Target 1 monster your opponent controls and 1 monster you control; destroy the first target, then give control of the second target to your opponent.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Remove Trap",
//         category: "Spell",
//         img: "https://uploads2.yugioh.com/card_images/2934/detail/4570.jpg?1385127258",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "Select 1 face-up Trap Card on the field and destroy it.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Swords of Revealing Light",
//         category: "Spell",
//         img: "https://uploads2.yugioh.com/card_images/1327/detail/1532.jpg?1385101451",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "After this card's activation, it remains on the field, but you must destroy it during the End Phase of your opponent's 3rd turn. When this card is activated: If your opponent controls a face-down monster, flip all monsters they control face-up. While this card is face-up on the field, your opponent's monsters cannot declare an attack.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Magical Hats",
//         category: "Trap",
//         img: "https://uploads4.yugioh.com/card_images/1849/detail/2064.jpg?1385102495",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "During your opponent's Battle Phase: Choose 2 Spells/Traps from your Deck and 1 monster in your Main Monster Zone. Special Summon them as Normal Monsters (ATK 0/DEF 0) in face-down Defense Position, Set the chosen monster if it is face-up, and shuffle them on the field. The 2 cards chosen from your Deck are destroyed at the end of the Battle Phase, and cannot remain on the field except during this Battle Phase.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Dragon Capture Jar",
//         category: "Trap",
//         img: "https://uploads2.yugioh.com/card_images/258/detail/Dragon-Capture-Jar.jpg?1375127335",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "Change all face-up Dragon-Type monsters on the field to Defense Position, also they cannot change their battle positions.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Negate Attack",
//         category: "Trap",
//         img: "https://uploads1.yugioh.com/card_images/2110/detail/2004.jpg?1385103024",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "When an opponent's monster declares an attack: Target the attacking monster; negate the attack, then end the Battle Phase.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Seven Tools of the Bandit",
//         category: "Trap",
//         img: "https://uploads3.yugioh.com/card_images/370/detail/Seven-Tools-of-the-Bandit.jpg?1375213018",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "When a Trap Card is activated: Pay 1000 LP; negate the activation, and if you do, destroy it.",
//         atk: 0,
//         def: 0
//     },
//     {
//         name: "Trap Hole",
//         category: "Trap",
//         img: "https://uploads1.yugioh.com/card_images/2814/detail/4574.jpg?1385127030",
//         attribute: "N/A",
//         monsterType: "N/A",
//         cardType: "N/A",
//         cardText: "When your opponent Normal or Flip Summons 1 monster with 1000 or more ATK: Target that monster; destroy that target.",
//         atk: 0,
//         def: 0
//     }
// ]

// app.get("/cards/seed", (req, res) => {
//     // Seed the starter cards
//     Card.create(cardCollection)
//     .then((data) => {
//         // Send created cards back to JSON
//         res.json(data)
//     })
// })

// // Delete all cards
// app.delete("/cards", (req, res) => {
//     Card.deleteMany({})
//         .then((data) => {
//             // Seed the starter cards
//             Card.create(cardCollection)
//             .then((data) => {
//                 // Send created cards back to JSON
//                 res.json(data)
//             })
//         })
// })


// Setup Server Listener
const port = process.env.PORT
app.listen(port, () =>  console.log(`Listening on port ${port}`))