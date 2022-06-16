import { Router } from "express"
import { readQuestions, readRandomQuestions } from "../database/mongoDB/crudFunctions/crudQuestions.js"

const router = Router()

router.get("/questions", async (req, res) => {
    res.send(await readQuestions())
})

//you can specify how many questions you want as a request parameter
router.get("/randomQuestions/:numberOfQuestions", async (req, res) => {
    try {
        res.send(await readRandomQuestions(req.params.numberOfQuestions))
    } catch (err) {
        if (err instanceof RangeError){
            res.status(400).send({errMsg : "requested more questions than available", maxQuestions : err.cause.maxQuestions})
        } else {
            res.status(500).send()
        }
    }
})

export default router