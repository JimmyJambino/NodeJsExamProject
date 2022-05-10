import { readable, writable } from "svelte/store";

export const baseURL = readable("http://localhost:3000")
const url = "http://localhost:3000"

export const currentUser = writable(undefined)



