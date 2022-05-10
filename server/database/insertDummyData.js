import db from "./createConnection.js"

class Game {
    constructor(name, price, description) { 
        this.name = name
        this.price = price
        this.description = description
    }
}

const games = [
    new Game("Fib or Dib!", 25, 
    "Do you know the answer to the questions? Doesn't matter! In this game it's all about trying to trick your friends into believing your answer is real.")
]
//games.forEach(elem => {console.log(elem.name)})

async function createDummyGames() { // To fill out the database for testing, later to actually fill out the database with pre-made games.
    games.forEach(game => {
        db.run(`INSERT INTO games (name, price, description) VALUES (?, ?, ?)`, 
        [game.name, game.price, game.description])
    })
}

createDummyGames()
