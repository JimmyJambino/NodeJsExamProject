import db from "../database/sqliteDB/createConnection.js"
import { Router } from "express"
import { compare } from "bcrypt"
import { createAccount } from "../database/sqliteDB/crudFunctions/crudAccounts.js"
import { getPassword ,readAccountByEmail} from "../database/sqliteDB/crudFunctions/crudAccounts.js"
import { readAllGamesByAccountId } from "../database/sqliteDB/crudFunctions/crudAccountsGames.js"

const ROUNDS = 12


const router = Router()

//used to check if user is eligible to HOST a game
router.post("/checkGameOwnership", async (req,res) => {
    const providedDetails = req.body //{game_id: 1}
    console.log("owned games:",req.session.ownedGames);
    if (req.session.isLoggedIn && req.session.ownedGames.includes(providedDetails.game_id)) {
        console.log("VI ER VALID, account router");
        res.status(200).send({validOwnership: true})
    } else {
        res.status(400).send({validOwnership: false})
    }
    

})

// Sign up
router.post("/register", async (req, res) => {
    try{
        const providedDetails = req.body

        if(!providedDetails.firstName || !providedDetails.lastName || !providedDetails.email || !providedDetails.password){
            throw new Error("Missing details", {cause: "missingDetails"})
        }
    
        const userExists = await readAccountByEmail(providedDetails.email)
        
    
        if(userExists){
            throw new Error("user with that mail already exists", {cause: "mailAlreadyExists"})
        }
    
        const emailValidationRegex =
        new RegExp(/\S+@\S+\.\S+/)
    
        if(!emailValidationRegex.test(providedDetails.email)){
            throw new Error("invalid email", {cause: "invalidEmail"})
        }
    

        //TODO: this should work but the regex is hard to explain, remember to comment/uncomment the related part in catch
        // const passwordValidationRegex =
        // new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/)
    
        // if(!passwordValidationRegex.test(providedDetails.password)){
        //     throw new Error("invalid password", {cause: "invalidPassword"})
        // }
        
    
        createAccount(providedDetails)
        
        res.send({isRegisterSuccessful: true})

    } catch(err){
        switch (err.cause) {
            case "mailAlreadyExists":
                res.status(400).send({errMsg: "Email is already in use", cause: "mailAlreadyExists"})
                break;
            case "invalidEmail":
                res.status(400).send({errMsg: "Email is invalid", cause: "invalidEmail"})
                break;
            // case "invalidPassword":
            //     res.status(400).send({errMsg: "password is invalid", cause: "invalidPassword"})
            //     break;
            case "missingDetails":
                res.status(400).send({errMsg: "Missing details", cause: "missingDetails"})
                break;
            default:
                console.error("Unknown error in signup")
                res.status(500).send({errMsg: "internal server error", cause: "internalServerError"})
                break;
        }
    }
})


// Login
router.post("/login", async (req, res) => {
    try{
        const loginDetails = req.body
    
        //check if email and password was sent to the server
        if (!loginDetails.email || !loginDetails.password){
            throw new Error("missing email or password", {cause: "missingDetails"})
        }
        
        const accountFromDatabase = await readAccountByEmail(loginDetails.email)
       
        //does account exist?
        if (!accountFromDatabase){
            throw new Error("no user with that email", {cause: "incorrectEmail"})
        }
        //checks pw
        const isValidLogin = await compare(loginDetails.password, accountFromDatabase.hashed_password)
    
        if(isValidLogin){
            const listOfOwnedGames = await readAllGamesByAccountId(accountFromDatabase.id)
            const alteredListOfGames = listOfOwnedGames.map( (game) => {
                return game.game_id
            })
            req.session.isLoggedIn = true
            req.session.accountId = accountFromDatabase.id
            req.session.ownedGames = alteredListOfGames
            res.send({isLoggedIn: true, ownedGames: listOfOwnedGames, user: {email:accountFromDatabase.email} })
        } else {
            throw new Error("Incorrect password", {cause : "incorrectPassword"})
        }
        
    } catch (err){
        switch (err.cause) {
            case "missingDetails":
                res.status(400).send({errMsg: "Missing email or password", cause: err.cause})
                break;
            case "incorrectEmail":
                res.status(400).send({errMsg: "Incorrect login", cause: "incorrectLogin"})
                break;
            case "incorrectPassword":
                res.status(400).send({errMsg: "incorrect login", cause: "incorrectLogin"})
                break;
            default:
                res.status(500).send({errMsg: "internal server error"})
                break;
        }
    }
})

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy()
    res.send({isLoggedIn: false})
})
// Update

export default router