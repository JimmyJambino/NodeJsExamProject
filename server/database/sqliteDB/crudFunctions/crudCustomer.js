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
function createCustomer(customer) {
    const hashedPassword = await bcrypt.hash(customer.password, saltRounds)
    db.run(`INSERT INTO customers (firstName, lastName, email, hashedPassword) VALUES (?, ?, ?, ?)`, [customer.firstName, customer.lastName, customer.email, hashedPassword])
}

// read
async function readCustomer(customerId) {
    const result = await db.run(`SELECT 1 FROM customers where id = ?`, customerId)
    return result
}


async function readAllCustomers() {
    const result = await db.run(`SELECT * FROM customers`)
    return result
}

// update
function updateCustomer(customer) {
    db.run(`UPDATE customers SET firstName = ?, lastName = ?, email = ? WHERE email = ?` , [customer.firstName, customer.lastName, customer.email,customer.email])
}

//TODO: customer.password might be wrong here.
async function updateCustomerPassword(customer, newPassword) {
    // check if current password is true
    // set new hash password
    const result = await db.get(`SELECT hashedPassword from customers WHERE id = ?`, [customer.id])
    const compared = await bcrypt.compare(customer.password, result)
    if(compared) {
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds)
        db.run(`UPDATE customers SET hashedPassword = ? WHERE id = ?`, [newHashedPassword, customer.id])
    } else {
        // Error?
    }
}

// delete
function deleteCustomer(customerId) {
    db.run(`DELETE FROM customers where id = ?`, customerId)
}