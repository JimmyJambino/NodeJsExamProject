import {Router} from "express"
import { readAllQuestions, readQuestions, readRandomQuestions, createQuestion } from "../database/crudFunctions/crudQuestions.js"

const questionRouter = Router()

questionRouter.get("/questions", async (req, res) => {
    res.send(await readAllQuestions())
})

questionRouter.get("/questions/:id", async (req, res) => {
    const gameId = req.params.id
    res.send(await readQuestions(gameId))
})

questionRouter.get("/questions/:id/:number", async (req, res) => {
    const gameId = req.params.id
    const number = req.params.number
    res.send(await readRandomQuestions(gameId, number))
}) 

questionRouter.post("/questions", (req, res) => {
    createQuestion(req.body)
    res.send({})
})
export default questionRouter