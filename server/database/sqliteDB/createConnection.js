import sqlite3 from "sqlite3"
import {open} from "sqlite"

//branch test 

const db = await open({
    filename: "box.db",
    driver: sqlite3.Database
})
db.get(`PRAGMA foreign_keys = ON`) // Allows foreign keys

export default db