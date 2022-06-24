import db from "./createConnection.js"

// We could implement deleteMode (if true then) to control whether to drop or not.
//db.exec(`DROP TABLE IF EXISTS orders`)


async function makeSchemas() {
    await db.exec(`DROP TABLE IF EXISTS accounts;
        CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        hashed_password VARCHAR(100) NOT NULL
    );`)
    
    await db.exec(`DROP TABLE IF EXISTS games;
        CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        imgSrc VARCHAR(300) NOT NULL,
        price DOUBLE NOT NULL,
        description VARCHAR(150),
        rating INTEGER NOT NULL
    );`)
    
    await db.exec(`DROP TABLE IF EXISTS merch;
        CREATE TABLE IF NOT EXISTS merch (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            imgSrc VARCHAR(300) NOT NULL,
            price DOUBLE NOT NULL,
            description VARCHAR(150)
        );
    `)

    //many to many relationship table
    await db.exec(`DROP TABLE IF EXISTS accounts_games;
        CREATE TABLE IF NOT EXISTS accounts_games  (
        account_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL
    );`)
    
    
}

export default makeSchemas