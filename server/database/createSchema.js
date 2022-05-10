import db from "./createConnection.js"
/*
Developer note (aren't all notes for developers?) Tables to be created:
customer = {
    id,
    firstName,
    lastName,
    email,
    hashedPassword
}

games = {
    id,
    price,
    description,

}

questions = {
    id,
    question,
    answer
}

*/

// We could implement deleteMode (if true then) to control whether to drop or not.
//db.exec(`DROP TABLE IF EXISTS orders`)
db.exec(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL
);`)

db.exec(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL,
    description VARCHAR(150)
);`)

// db.exec(`CREATE TABLE IF NOT EXISTS orders (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     customerId INTEGER NOT NULL,
//     FOREIGN KEY(customerId) REFERENCES customers(id)
// );`)

db.exec(`CREATE TABLE IF NOT EXISTS order_games (
    orderId INTEGER NOT NULL,
    gamesId INTEGER NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id),
    FOREIGN KEY(gamesId) REFERENCES games(id)
);`)

db.exec(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question VARCHAR(150) NOT NULL,
    answer VARCHAR(50) NOT NULL
)`)

db.exec(`CREATE TABLE IF NOT EXISTS customer_games  (
    customerId INTEGER NOT NULL,
    gameId INTEGER NOT NULL
)`)

