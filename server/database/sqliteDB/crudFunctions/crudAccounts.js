import db from "../createConnection.js"
import bcrypt from "bcrypt"

const saltRounds = 12

// create
/*
id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL
    */
export async function createAccount(account) {
    const hashedPassword = await bcrypt.hash(account.password, saltRounds)
    db.run(`INSERT INTO accounts (first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?)`,
     [account.firstName, account.lastName, account.email, hashedPassword])
}

// read
async function readAccount(accountId) {
    const result = await db.run(`SELECT * FROM accounts WHERE id = ?`, accountId)
    return result
}

//used to check if password is correct
export async function getPassword(email) {
    const result = await db.get("SELECT hashed_password FROM accounts WHERE email = ?", [email])
    return result
}
export async function readAccountByEmail(email){
    const result = await db.get("SELECT * FROM accounts WHERE email = ?", [email])
    return result
}

export async function readAllAccounts() {
    const result = await db.all(`SELECT * FROM accounts`)
    return result
}

// update
function updateAccount(account) {
    db.run(`UPDATE accounts SET first_name = ?, last_name = ?, email = ? WHERE email = ?` ,
     [account.firstName, account.lastName, account.email, account.email])
}

//TODO: customer.password might be wrong here.
async function updateAccountPassword(account, newPassword) {
    // check if current password is true
    // set new hash password
    const result = await db.get(`SELECT hashed_password from accounts WHERE id = ?`, [account.id])
    const compared = await bcrypt.compare(account.password, result)
    if(compared) {
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds)
        db.run(`UPDATE account SET hashed_password = ? WHERE id = ?`, [newHashedPassword, account.id])
    } else {
        // Error?
    }
}

// delete
function deleteAccount(accountId) {
    db.run(`DELETE FROM account where id = ?`, accountId)
}