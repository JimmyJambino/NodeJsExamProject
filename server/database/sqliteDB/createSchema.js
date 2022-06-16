import db from "./createConnection.js"
/*
Developer note (aren't all notes for developers?) Tables to be created:
account = {
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
db.exec(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL
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

//many to many relationship table
db.exec(`CREATE TABLE IF NOT EXISTS customer_games  (
    customerId INTEGER NOT NULL,
    gameId INTEGER NOT NULL
)`)

