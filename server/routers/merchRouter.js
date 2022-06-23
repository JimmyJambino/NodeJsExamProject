import { Router } from "express"
import { readAllMerch } from "../database/sqliteDB/crudFunctions/crudMerch.js"

const merchRouter = Router()

//return all games
merchRouter.get("/merch", async (req,res) => {
    res.send(await readAllMerch())
})

export default merchRouter