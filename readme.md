# Project 2
#### By JAMESON WANG

## Project Summary

I will be building an online Yu-Gi-Oh card collection and will be using tools for them to create, read, update, and delete each card

## Models

List here any models in your app and their properties

## Route Table

List your routes in a table

| url | method | action |
|-----|--------|--------|
| /yugioh | get | get all card (index)|
| /yugioh/new | get | get a particular card (new)|
| /yugioh | post | get a particular card (create)|
| /yugioh/:id | get | get a particular card (show)|
| /yugioh/:id/edit | get | get a particular card (edit)|
| /yugioh/:id | put | get a particular card (update)|
| /yugioh/:id | delete | get a particular card (destroy)|

## User Stories

Users will be able to look up any Yu-Gi-Oh card and have information of different kinds of monsters, trap cards, and magic cards.

## Challenges

- A challenge I'm having is to create an image on the edit/new liquid.
- Cannot access "yugioh/id". What appears in the URL is "cards/id".
    Changed the URL into cards/id instead.

- Could not add the images
    ```<a href="/cards/new"></a> ```
    - Was able to solve this solution because the array was in the code block.

- Had trouble creating the routes to appear but was able to solve it by deleting "/cards" in the URL with the "route" variable

## List of Technologies

- JavaScript
- Express / Node
- Mongo / Mongoose

## Tasks
- Setup all the dependencies and all the installments.
- Creating a model with all the yu-gi-oh cards.
- Setup Middleware
- Created controllers/connection.js
- Created and linked connection.js with ./models/yugioh.js
- Completed the routes
- Will be exporting all database into different folders.
- Creating a sandwich menu