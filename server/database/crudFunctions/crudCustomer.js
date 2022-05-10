import db from "../createConnection.js"


// create
/*
id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL
    */
function createCustomer(customer) {
    db.run(`INSERT INTO customers (firstName, lastName, email, hashedPassword) VALUES (?, ?, ?, ?)`, [customer.firstName, customer.lastName, customer.email, customer.hashedPassword])
}

// read

// update

// delete