import { readable, writable } from "svelte/store";

export const baseURL = readable("http://localhost:3000")
const url = "http://localhost:3000"

export const currentUser = writable(null)
export const playTime = writable(false)
//export const savedRoomKey = writable("")

//import {io} from "socket.io-client"
//function to get an individual socket
//export const socket = writable()

