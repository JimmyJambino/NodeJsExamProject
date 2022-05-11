import { MongoClient } from "mongodb"

const url = "mongodb://localhost:27017"
const dbName = "boxTV"

export const client = await MongoClient.connect(url)

const db = client.db(dbName)


export default {
    fibOrDib: db.collection("FibOrDib"),
}