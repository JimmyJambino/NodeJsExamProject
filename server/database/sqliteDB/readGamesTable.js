import db from "./createConnection.js"

async function readAllGames() {
    const result = await db.all('SELECT * FROM games') // all is for all cases, where db.get is for first instance.
    return result
}

export default readAllGames