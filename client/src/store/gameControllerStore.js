import { readable, writable } from "svelte/store";

export const awaitingTextInput = writable(false)
export const awaitingOptionInput = writable(false)
export const playerName = writable("")