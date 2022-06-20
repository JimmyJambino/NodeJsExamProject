import db from "../createConnection.js"

// Some of the CRUD functionality is only prepared for future reference when checking information such as sales/revenue.
// create
export function createAccountsGames(accountId, gameId) {
    db.run(`INSERT INTO accounts_games VALUES (?, ?)`, accountId, gameId)
}

// read all the games of a customer
export async function readAllGamesByAccountId(accountId) {
    const result = await db.all(`SELECT * FROM accounts_games WHERE account_id = ?`, accountId)
    return result
}

//total sales
async function readAllAccountByGameId(gameId) {
    const result = await db.all(`SELECT * FROM accounts_games where game_id = ?`, gameId)
    return result
}

// delete, in case of refund?
export function deleteAccountGamesByIds(accountId, gameId) {
    db.run(`DELETE FROM accounts_games WHERE account_id = ?, game_id = ?`, accountId, gameId)
}