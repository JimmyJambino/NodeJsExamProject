import {readable, writable} from "svelte/store"

const baseURL = readable("http://localhost:3000")
const url = "http://localhost:3000"
export async function getAllMerch() {
    const response = await fetch(url + "/api/merch")
    const merchData = await response.json()
    return merchData
}

export const allMerch = new writable([])






