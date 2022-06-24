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

class Merch {
    constructor(id, name, imgSrc, price, description){
        this.id = id
        this.name = name
        this.imgSrc = imgSrc
        this.price = price
        this.description = description
    }
}

//games.forEach(elem => {console.log(elem.name)})

export async function createDummyGames() { // To fill out the database for testing, later to actually fill out the database with pre-made games.
    const games = [
        new Game(null,"Fib or Dib!","https://ih1.redbubble.net/image.2645073770.4034/flat,750x1000,075,f.jpg", 25, 
        "Do you know the answer to the questions? Doesn't matter! In this game it's all about trying to trick your friends into believing your answer is real.",4),
        new Game(null,"Find The Poggers","https://afkstreaming.com/wp-content/uploads/2022/02/Poggers-Emote.png", 10, "This game is all about clicking on the PogChamps to increase your Hype!",5),
        new Game(null,"No more sadGe",  "https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png", 15, "Tired of being unmotivated and depressed? Shoot all the sadGe emotes to increase your happiness!",3),
        new Game(null,"YaYeet!!",  "https://mystickermania.com/cdn/stickers/games/roblox-yeet-512x512.png", 15, "Throw some random stuff around and pray the cops wont get you",2),
        new Game(null,"B R E A D",  "https://www.kohberg.com/media/spedopcl/250821-kohberg-40-kopier.png?width=500&quality=80", 15, "Bread",5),
        new Game(null,"IT'S MORBIN TIME",  "https://www.gamelivestory.com/thumb/web-story-square/images/article/its-morbin-time-how-morbius-became-a-meme-main.webp", 15, "Jared Leto is back to destroy your favourite characters! Join him, as he is inevitable..",3)
    ]
    games.forEach(game => {
        db.run(`INSERT INTO games (name, imgSrc, price, description,rating) VALUES (?, ?, ?,?,?)`, 
        [game.name, game.imgSrc, game.price, game.description,game.rating])
    })
}
export async function dummyMerch() {
    //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU
    const merch = [
        new Merch(null,"Meme tshirt 1","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",12,"This is objectively bad shirt"),
        new Merch(null,"Meme tshirt 2","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",13,"This is objectively bad shirt"),
        new Merch(null,"Meme tshirt 3","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",14,"This is objectively bad shirt"),
        new Merch(null,"Meme tshirt 4","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",16,"This is objectively bad shirt"),
        new Merch(null,"Meme tshirt 5","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",103,"This is objectively bad shirt"),
        new Merch(null,"Meme tshirt 6","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL5Od9hsA9qQYSg9vG2VQFjvdD7OdA4EJBQ&usqp=CAU",1043,"This is objectively bad shirt")
    ]
    merch.forEach( merch => {
        db.run(`INSERT INTO merch (name, imgSrc,price,description) VALUES (?,?,?,?)`,
        [merch.name,merch.imgSrc,merch.price,merch.description])
    })
}

export async function dummyAccount(){
    const hashedPassword = await bcrypt.hash("lol123", saltRounds)
    db.run(`INSERT INTO accounts (first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?)`,
    ["Michael", "Westh", "lol@lol.dk", hashedPassword])
}

export async function dummyAccoutGamesConnections() {
    db.run(`INSERT INTO accounts_games VALUES (1,1);`)
    db.run(`INSERT INTO accounts_games VALUES (1,3);`)
}



export default createDummyGames
