import { Router } from "express"
import { compare, hash } from "bcrypt"
import db from "../database/sqliteDB/createConnection.js"

const ROUNDS = 12


const router = Router()

// Sign up
router.post("/signup", async (req, res) => {
    const providedDetails = req.body

    console.log(req.body);
    //TODO: validate provided email and password


    const hashed_password = await hash(providedDetails.password.toString(), ROUNDS)

    console.log(hashed_password);

    // db.run("INSERT INTO accounts VALUES ($first_name, $last_name, $email, $hashed_password)", {
    //     $first_name: providedDetails,
    //     $last_name: providedDetails,
    //     $email: providedDetails,
    //     $hashed_password: hashed_password,
    // })
    
    res.send({})

})


// Login
router.post("/login", async (req, res) => {
    const loginDetails = req.body

    //check if email and password was sent to the server
    if (!loginDetails.email && loginDetails.password){
        throw new Error("missing email or password")
    }
    

    const accountFromDb = db.get("SELECT hashed_ password FROM accounts WHERE email = $email",{$email: loginDetails.email})

    const isValidLogin = await compare(loginDetails.password, accountFromDb.hashed_password)

    //TODO: send session cookie or some other auth
    res.send()

})

// Logout
// Update

export default router