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
        price DOUBLE NOT NULL,
        description VARCHAR(150)
    );`)
    
    await db.exec(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        FOREIGN KEY(account_id) REFERENCES accounts(id)
    );`)
    
    await db.exec(`DROP TABLE IF EXISTS orders_games;
    CREATE TABLE IF NOT EXISTS orders_games (
        order_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(game_id) REFERENCES games(id)
    );`)
    
    await db.exec(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question VARCHAR(150) NOT NULL,
        answer VARCHAR(50) NOT NULL
    )`)
    
    //many to many relationship table
    await db.exec(`CREATE TABLE IF NOT EXISTS accounts_games  (
        account_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL
    )`)
    
    
}

export default makeSchemas