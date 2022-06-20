import db from "../database/sqliteDB/createConnection.js"
import { Router } from "express"
import { compare } from "bcrypt"
import { createAccount } from "../database/sqliteDB/crudFunctions/crudAccounts.js"
import {} from "express-session"

const ROUNDS = 12


const router = Router()

// Sign up
router.post("/signup", async (req, res) => {
    try{
        const providedDetails = req.body
    
        //TODO: validate provided email and password
        const userExists = await db.get("SELECT * FROM accounts WHERE email= $email", {
            $email: providedDetails.email
        })
    
        if(userExists){
            throw new Error("user with that mail already exists", {cause: "mailAlreadyExists"})
        }
    
        const emailValidationRegex =
        new RegExp(/\S+@\S+\.\S+/)
    
        if(!emailValidationRegex.test(providedDetails.email)){
            throw new Error("invalid email", {cause: "invalidEmail"})
        }
    

        //TODO: this should work but the regex is hard to explain, remeber to comment/uncomment the related part in catch
        // const passwordValidationRegex =
        // new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/)
    
        // if(!passwordValidationRegex.test(providedDetails.password)){
        //     throw new Error("invalid password", {cause: "invalidPassword"})
        // }
        
    
        createAccount(providedDetails)
        
        res.send({})

    } catch(err){
        switch (err.cause) {
            case "mailAlreadyExists":
                res.status(400).send({errMsg: "Email is already in use"})
                break;
            case "invalidEmail":
                res.status(400).send({errMsg: "Email is invalid"})
                break;
            // case "invalidPassword":
            //     res.status(400).send({errMsg: "password is invalid"})
            //     break;
            default:
                console.error("Unknown error in signup")
                res.status(500).send({errMsg: "internal server error"})
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
        
        const accountFromDb = await db.get("SELECT hashed_password FROM accounts WHERE email = ?", [loginDetails.email])
    
        const isValidLogin = await compare(loginDetails.password, accountFromDb.hashed_password)
    
        if(isValidLogin){
            req.session.isLoggedIn = true
            res.send({isLoggedIn: true})
        } else {
            res.status(400).send({isLoggedIn: false})
        }
        
    } catch (err){
        switch (err.cause) {
            case "missingDetails":
                res.status(400).send({errMsg: "Missing email or password"})
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