import crypto from "crypto";

export function playerJoin(socket) {
    socket.on("room:playerJoined", (data) => {
        const player = {
            name: data.playerName,
            id: socket.id
        }
        socket.join(data.roomKey) 
        socket.to(data.roomKey).emit("room:playerHasJoined", player)
    })
}

export function hostJoin(socket) {
    socket.on("hostJoined", (data) => {
        socket.join(data.roomKey)
        console.log("Host joined.")
    })
}

export function helloMessage(socket) {
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
        socket.emit("room:displayRoomCode", {roomKey})
    })
    //make host join the room
    //send the roomcode back to the host so it can be displayed
    
}

export function startGame(socket) {
    socket.on("room:startGame", (data) => {
        //socket.join(data.roomKey)
        socket.to(data.roomKey).emit("room:gameStarted", {})
        //socket.emit("room:gameStarted")
        console.log("Host started game on:", data.roomKey)
        // socket.to(data.roomKey).emit("room:playerHasJoined", data.playerName)
    })
}

function joinRoom(socket){
    socket.on("room:playerJoin", ({roomKey}) => {
        socket.join(roomKey)
    })
}