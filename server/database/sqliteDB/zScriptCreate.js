import makeSchemas from "./createSchema.js"
import { readAllAccounts } from "./crudFunctions/crudAccounts.js"
import createDummyGames, {dummyAccount, dummyMerch} from "./insertDummyData.js"
import readAllGames from "./readGamesTable.js"

console.log("Creating sqlite3 database with tables and dummy data...")
await makeSchemas()
await createDummyGames()
await dummyAccount()
await dummyMerch()


//console.log(await readAllAccounts());
console.log(await readAllGames());