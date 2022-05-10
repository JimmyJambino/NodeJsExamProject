import db from "../createConnection.js"

// Some of the CRUD functionality is only prepared for future reference when checking information such as sales/revenue.
// create
export function createCustomerGames(customerId, gameId) {
    db.run(`INSERT INTO customer_games VALUES (?, ?)`, customerId, gameId)
}
// read

export async function readAllGamesByCustomerId(customerId) {
    const result = await db.all(`SELECT * FROM customer_games WHERE customerId = ?`, customerId)
    return result
}

async function readAllCustomersByGameId(gameId) {
    const result = await db.all(`SELECT * FROM customer_games where gameId = ?`, gameId)
    return result
}

// delete, in case of refund?
export function deleteCustomerGamesByIds(customerId, gameId) {
    db.run(`DELETE FROM customer_games WHERE customerId = ?, gameId = ?`, customerId, gameId)
}