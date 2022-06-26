// Rename this js file to roomController or roomConnection

import crypto from "crypto";
import { Socket } from "socket.io";
export let rooms = new Map()
export function combineConnectionSockets(socket) {
    playerJoin(socket)
    createRoom(socket)
    disconnect(socket)
    roomValidation(socket)
}

function playerJoin(socket) {
    socket.on("player:playerJoined", (data) => {
        const player = {
            name: data.name,
            id: socket.id,
            score: 0
        }
        socket.join(data.roomKey) 
        socket.to(data.roomKey).emit("player:playerHasJoined", player)
        rooms.get(data.roomKey).push(socket.id)
    })
}

function roomValidation(socket) {
    socket.on("player:roomValidation", (roomKey) => {
        socket.emit("player:roomValidation", rooms.get(roomKey) !== undefined)
    })
    
    
}

function createRoom(socket){
    //4 char random code of numbers and letters
    const roomKey = crypto.randomBytes(2).toString("hex").toUpperCase()
    socket.on("room:hostJoined", () => {
        socket.join(roomKey)
        rooms.set(roomKey, [socket.id]) // creates a new key-value pair with an array as the value
        socket.emit("room:displayRoomCode", {roomKey})
    })
    //make host join the room
    //send the roomcode back to the host so it can be displayed
}


// #################  DISCONNECT ######################
import { getRoomBySocketId } from './socketUtils.js'

function disconnect(socket) { 
    socket.on("disconnecting", (reason) => { // reason is the error message.
        for(const room of socket.rooms) { // socket.rooms is the same rooms as at the top of this file
            if(room !== socket.id) { // checks each individual socket if it is the one that was disconnected
                const roomKey = getRoomBySocketId(rooms, socket.id) // gets roomKey by the host socket
                socket.to(roomKey).emit("player:disconnectedPlayer", socket.id) // emits to the host that a player with their respective socket id has disconnected.
            }
        }
    })
}