import db, {client} from "./createConnection.js"
import fs from "fs"
import path from "path"

export async function initiateMongo(){
    const fibOrDibData = fs.readFileSync(path.resolve("./database/mongoDB/datadump/boxTV_questions.json"))
    const parsedFibOrDibData = JSON.parse(fibOrDibData)
    
    await db.fibOrDib.insertMany(parsedFibOrDibData)
    
    //closes the connection so the program script terminates
    client.close()
}