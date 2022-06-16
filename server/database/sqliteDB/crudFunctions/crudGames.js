import db from "../createConnection.js"


export function createGame(game) {
    db.run(`INSERT INTO games (name, price, description)`, [game.name, game.price, game.description])
}


export async function readAllGames() {
    const result = await db.all("SELECT * FROM games")
    return result
}

export async function readAGame(game) {
    const result = await db.all("SELECT * FROM games WHERE id= ?",[game.id])
    return result
}

export function updateGame(game) {
    db.run("UPDATE games SET name = ?, price = ?, description = ?", [game.name, game.price, game.description])
}

// We might not even need this? And remember to delete relations as well in the many-to-many tables.
export function deleteGame(gameId) {
    db.run("DELETE FROM games where id = ?", gameId)
}