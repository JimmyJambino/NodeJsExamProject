import { Router } from "express"
import { readAllGames } from "../database/sqliteDB/crudFunctions/crudGames.js"

const gameRouter = Router()

//return all games
gameRouter.get("/games", async (req, res) => {
    res.send(await readAllGames())
})

export default gameRouter