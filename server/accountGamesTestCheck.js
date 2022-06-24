import { readAllGamesByAccountId } from "./database/sqliteDB/crudFunctions/crudAccountsGames.js"

(async () => {
    console.log(await readAllGamesByAccountId(1))
})()

