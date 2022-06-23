import db from "./createConnection.js"
import bcrypt from "bcrypt"

const saltRounds = 12

class Game {
    constructor(id, name, imgSrc, price, description, rating) { 
        this.id = id
        this.name = name
        this.imgSrc = imgSrc
        this.price = price
        this.description = description
        this.rating = rating
    }
}

//games.forEach(elem => {console.log(elem.name)})

export async function createDummyGames() { // To fill out the database for testing, later to actually fill out the database with pre-made games.
    const games = [
        new Game(null,"Fib or Dib!","https://ih1.redbubble.net/image.2645073770.4034/flat,750x1000,075,f.jpg", 25, 
        "Do you know the answer to the questions? Doesn't matter! In this game it's all about trying to trick your friends into believing your answer is real.",4),
        new Game(null,"Find The Poggers","https://afkstreaming.com/wp-content/uploads/2022/02/Poggers-Emote.png", 10, "This game is all about clicking on the PogChamps to increase your Hype!",5),
        new Game(null,"No more sadGe!",  "https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png", 15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!",3),
        new Game(null,"No more sadGe!",  "https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png", 15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!",3),
        new Game(null,"No more sadGe!",  "https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png", 15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!",3),
        new Game(null,"No more sadGe!",  "https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png", 15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!",3)
    ]
    games.forEach(game => {
        db.run(`INSERT INTO games (name, imgSrc, price, description,rating) VALUES (?, ?, ?,?,?)`, 
        [game.name, game.imgSrc, game.price, game.description,game.rating])
    })
}

export async function dummyAccount(){
    const hashedPassword = await bcrypt.hash("lol123", saltRounds)
    db.run(`INSERT INTO accounts (first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?)`,
    ["Michael", "Westh", "lol@lol.dk", hashedPassword])
}



export default createDummyGames
