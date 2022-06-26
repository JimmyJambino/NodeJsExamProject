import {Router} from "express"
import { deleteAccountGamesByIds } from "../database/sqliteDB/crudFunctions/crudAccountsGames.js"

const router = Router()

//used to check if user is eligible to HOST a game
router.post("/checkGameOwnership", (req,res) => {
    const providedDetails = req.body //{game_id: 1}

    if (req.session.isLoggedIn && req.session.ownedGames.includes(providedDetails.game_id)) {
        res.status(200).send({validOwnership: true})
    } else {
        res.status(400).send({validOwnership: false})
    }

})


router.delete("/accountsGames", (req, res) => {
    if (req.session.isLoggedIn){
        const customerId = req.body.customerId
        const gameId = req.body.gameId
        deleteAccountGamesByIds(customerId, gameId)
        res.send({})
    } else {
        res.status(400).send()
    }
})

export default router