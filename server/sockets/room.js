import crypto from "crypto";

function createRoom(socket, playerNumberCap){
    //4 char random code of numbers and letters
    const roomCode = crypto.randomBytes(2).toString("hex")
    
    //make host join the room
    hostSocket.join(roomKey)
    //send the roomcode back to the host so it can be displayed
    hostSocket.emit("room:displayRoomCode", {roomKey})
}

function joinRoom(socket){
    socket.on("room:playerJoin", ({roomKey}) => {
        socket.join(roomKey)
    })
}
