import {Router} from "express"
import { readAllGamesByCustomerId, createCustomerGames, deleteCustomerGamesByIds } from "../database/sqliteDB/crudFunctions/crudCustomerGames.js"

const customerGamesRouter = Router()

customerGamesRouter.get("/customerGames/:id", async (req, res) => {
    const customerId = req.params.id
    res.send(await readAllGamesByCustomerId(customerId))
})

customerGamesRouter.post("/customerGames", (req, res) => {
    const customerId = req.body.customerId
    const gameId = req.body.gameId
    createCustomerGames(customerId, gameId)
    res.send({})
})

customerGamesRouter.delete("/customerGames", (req, res) => {
    const customerId = req.body.customerId
    const gameId = req.body.gameId
    deleteCustomerGamesByIds(customerId, gameId)
})

export default customerGamesRouter