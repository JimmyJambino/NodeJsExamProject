import db from "../createConnection.js"

export function createMerch(merch) {
    db.run(`INSERT INTO merch (name,imgSrc,price,description)`,
     [merch.name,merch.imgSrc,merch.price,merch.description])
}

export async function readAllMerch() {
    const result = await db.all("SELECT * FROM merch")
    return result
}

export async function readOneMerch(merch) {
    const result = await db.all("SELECT * FROM merch WHERE id=?",[merch.id])
    return result
}





