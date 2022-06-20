import {Router} from "express"
import { readAllGamesByAccountId, createAccountsGames, deleteAccountGamesByIds } from "../database/sqliteDB/crudFunctions/crudAccountsGames.js"

const customerGamesRouter = Router()

customerGamesRouter.get("/customerGames/:id", async (req, res) => {
    const customerId = req.params.id
    res.send(await readAllGamesByAccountId(customerId))
})

customerGamesRouter.post("/customerGames", (req, res) => {
    const customerId = req.body.customerId
    const gameId = req.body.gameId
    createAccountsGames(customerId, gameId)
    res.send({})
})

customerGamesRouter.delete("/customerGames", (req, res) => {
    const customerId = req.body.customerId
    const gameId = req.body.gameId
    deleteAccountGamesByIds(customerId, gameId)
})

export default customerGamesRouter