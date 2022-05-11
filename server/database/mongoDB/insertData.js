import db, {client} from "./createConnection.js"

import fs from "fs"
import path from "path"
const fibOrDibData = fs.readFileSync(path.resolve("./datadump/boxTV_questions.json"))

const parsedFibOrDibData = JSON.parse(fibOrDibData)

await db.fibOrDib.insertMany(parsedFibOrDibData)

//closes the connection
client.close()