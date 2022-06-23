import { getRoomBySocketId } from "./socketUtils.js"
import { rooms } from './joinRoom.js'

// Rename this file to gameController.
// This script should include the general functions for inputs, options etc that a player/client can send to the host and vice versa
export function combineFibOrDib(socket) {
    inputAnswer(socket)
    fibdibArrayAnswer(socket)
    optionsAnswer(socket)
    startGame(socket)
    startRound(socket)
}

// ############ HOST ##############

function startGame(socket) {
    socket.on("room:startGame", (data) => {
        //socket.join(data.roomKey)
        socket.to(data.roomKey).emit("room:gameStarting", {})
        console.log("Host started game on:", data.roomKey)
    })
}

function startRound(socket) {
    socket.on("room:startRound", (data) => {
        socket.to(data.roomKey).emit("player:startedRound", {})

    })
}

function inputAnswer(socket) {
    socket.on("room:inputAnswer", data => { // receives answer from players
        const roomKey = getRoomBySocketId(rooms, socket.id)
        socket.to(roomKey).emit("room:inputAnswer", data) // saves answer at host
    })
}

function optionsAnswer(socket) {
    // playerId: playerSocket.id, // the choosing player id
    // choice: playerAnswer.input, // the choice
    // optionOwner: playerAnswer.socket.id // the choice owner
 
    socket.on("room:optionsAnswer", data => { // receives optional answer from players
        const roomKey = getRoomBySocketId(rooms, socket.id)
        socket.to(roomKey).emit("player:receiveOptions", data) // saves that choice to the host
    }) 
}

// ############ PLAYER ############
function fibdibArrayAnswer(socket) {
    socket.on("room:fibdibArrayAnswer", array => { // receives array of players with {input, socketId}
        const roomKey = getRoomBySocketId(rooms, socket.id)
        socket.to(roomKey).emit("player:options", array) // sends answers to the players, but this should wait until all answers have been submitted or time runs out.
    })
}