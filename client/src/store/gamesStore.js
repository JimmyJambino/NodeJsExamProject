import { writable,readable } from "svelte/store";

//url for REST api / backend
const url = "http://localhost:3000"

export async function getAllGames() {
    const response = await fetch(url + "/api/games")
    const gamesData = await response.json()
    return gamesData
}

export async function getAllMerch(){
    const response = await fetch(url+ "/api/merch")
    const result = await response.json()
    return result
}

//TODO: maybe readable store instead?
export const allGamesInTheStore = writable([])

export const merch = readable([])


export const cartList = writable([])