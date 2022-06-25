import makeSchemas from "./createSchema.js"
import { readAllAccounts } from "./crudFunctions/crudAccounts.js"
import createDummyGames, {dummyAccount, dummyMerch, dummyAccoutGamesConnections} from "./insertDummyData.js"
import readAllGames from "./readGamesTable.js"
import {readAllGamesByAccountId} from "./crudFunctions/crudAccountsGames.js"

console.log("Creating sqlite3 database with tables and dummy data...")
await makeSchemas()
await createDummyGames()
await dummyAccount()
await dummyMerch()
await dummyAccoutGamesConnections()


//console.log(await readAllAccounts());
//console.log(await readAllGames());
console.log((await readAllGamesByAccountId(1)));