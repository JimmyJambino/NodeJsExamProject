import makeSchemas from "./createSchema.js"
import createDummyGames from "./insertDummyData.js"
import readAllGames from "./readGamesTable.js"

console.log("Creating sqlite3 database with tables and dummy data...")
await makeSchemas()
await createDummyGames()
await readAllGames()
console.log(await readAllGames());