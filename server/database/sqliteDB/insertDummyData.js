import db from "./createConnection.js"

class Game {
    constructor(id ,name, price, description) { 
        this.id = id
        this.name = name
        this.price = price
        this.description = description
    }
}

//games.forEach(elem => {console.log(elem.name)})

export async function createDummyGames() { // To fill out the database for testing, later to actually fill out the database with pre-made games.
    const games = [
        new Game(null,"Fib or Dib!", 25, 
        "Do you know the answer to the questions? Doesn't matter! In this game it's all about trying to trick your friends into believing your answer is real."),
        new Game(null,"Find The Poggers", 10, "This game is all about clicking on the PogChamps to increase your Hype!"),
        new Game(null,"No more sadGe!",15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!"),
        new Game(null,"No more sadGe!",15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!"),
        new Game(null,"No more sadGe!",15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!"),
        new Game(null,"No more sadGe!",15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!")
    ]
    games.forEach(game => {
        db.run(`INSERT INTO games (name, price, description) VALUES (?, ?, ?)`, 
        [game.name, game.price, game.description])
    })
}

export default createDummyGames
