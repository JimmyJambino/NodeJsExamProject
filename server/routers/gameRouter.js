import { Router } from "express"
import { readAllGames } from "../database/sqliteDB/crudFunctions/crudGames.js"

const gameRouter = Router()

gameRouter.get("/games", async (req, res) => {
    res.send(await readAllGames())
})

export default gameRouter