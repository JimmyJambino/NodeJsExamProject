import { writable,readable } from "svelte/store";

//url for REST api / backend
const url = "http://localhost:3000"

export async function getAllGames() {
    const response = await fetch(url + "/api/games")
    const gamesData = await response.json()
    console.log("gamesData",gamesData);
    return gamesData
}


export const allGamesInTheStore = writable([])


export const cartList = writable([])