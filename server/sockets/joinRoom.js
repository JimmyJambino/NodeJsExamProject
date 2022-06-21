// Rename this js file to roomController or roomConnection

import crypto from "crypto";
import { Socket } from "socket.io";
let rooms = new Map()
export function combineFunctions(socket) {
    playerJoin(socket)
    hostJoin(socket)
    createRoom(socket)
    startGame(socket)
    spec(socket)
    disconnect(socket)
}

export function playerJoin(socket) {
    socket.on("room:playerJoined", (data) => {
        const player = {
            name: data.playerName,
            id: socket.id
        }
        socket.join(data.roomKey) 
        socket.to(data.roomKey).emit("room:playerHasJoined", player)
        rooms.get(data.roomKey).push(socket.id)
    })
}

export function hostJoin(socket) {
    socket.on("hostJoined", (data) => {
        socket.join(data.roomKey)
        console.log("Host joined.")
    })
}

export function helloMessage(socket) { // Can we remove this?
    socket.on("room:hello", (data) => {
        socket.to(data.roomKey).emit("room:hello", (data.data))
    })
}

export function createRoom(socket, playerNumberCap){
    //4 char random code of numbers and letters
    const roomKey = crypto.randomBytes(2).toString("hex").toUpperCase()
    socket.on("room:hostJoined", (data) => {
        socket.join(roomKey)
        console.log("Host joined.")
        rooms.set(roomKey, [socket.id]) // creates a new key-value pair with an array as the value
        socket.emit("room:displayRoomCode", {roomKey})
    })
    //make host join the room
    //send the roomcode back to the host so it can be displayed
    
}

export function startGame(socket) {
    socket.on("room:startGame", (data) => {
        //socket.join(data.roomKey)
        socket.to(data.roomKey).emit("room:gameStarted", {})
        console.log("Host started game on:", data.roomKey)
    })
}

function joinRoom(socket){ // Can we remove this?
    socket.on("room:playerJoin", ({roomKey}) => {
        socket.join(roomKey)
    })
}

export function spec(socket) {// rename this function
    socket.on("playerNumber", (data) => {
        socket.to(data.id).emit("playerNumber", data.number)
    })
}

// #################  DISCONNECT ######################
function getRoomBySocketId(socketId) { // Finds a key (room) by the socket id
    for (let [key, value] of rooms.entries()) {
        if(value.indexOf(socketId) !== -1) { // checks each key value array for the searchValue and returns key if found
            return key
        }
    }
  }

// if more than one disconnect happens too fast / simultaneously, then it might not disconnect properly in the backend. How to solve?
// We could run a check 5-10min after no action has been taken to see if a room is empty or a player is still wrongly displayed?
export function disconnect(socket) { 
    socket.on("disconnecting", (reason) => { // reason is the error message.
        for(const room of socket.rooms) {
            if(room !== socket.id) {
                const roomKey = getRoomBySocketId(socket.id)
                console.log("Room key for disconnection:", roomKey)
                socket.to(roomKey).emit("disconnectedPlayer", socket.id)
            }
        }
    })
}