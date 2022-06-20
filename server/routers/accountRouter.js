import db from "../database/sqliteDB/createConnection.js"
import { Router } from "express"
import { compare } from "bcrypt"
import { createAccount } from "../database/sqliteDB/crudFunctions/crudAccounts.js"
import {} from "express-session"

const ROUNDS = 12


const router = Router()

// Sign up
router.post("/signup", async (req, res) => {
    const providedDetails = req.body

    console.log(providedDetails)
    //TODO: validate provided email and password


    createAccount(providedDetails)
    
    res.send({})
})


// Login
router.post("/login", async (req, res) => {
    const loginDetails = req.body

    //check if email and password was sent to the server
    if (!loginDetails.email && loginDetails.password){
        throw new Error("missing email or password")
    }
    
    const accountFromDb = await db.get("SELECT hashed_password FROM accounts WHERE email = $email",{$email: loginDetails.email})

    const isValidLogin = await compare(loginDetails.password, accountFromDb.hashed_password)

    if(isValidLogin){
        if(req.session.isLoggedIn){
            console.log("already logged in");
        }
        console.log("valid")
        req.session.isLoggedIn = true
        res.send({isLoggedIn: true})
    } else {
        console.log("not valid");
    }
})

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy()
    res.send({isLoggedIn: false})
})
// Update

export default router