import crypto from "crypto";

function createRoom(socket, playerNumberCap){
    //4 char random code of numbers and letters
    const roomCode = crypto.randomBytes(2).toString("hex")
    
    //make host join the room
    hostSocket.join(roomCode)
    //send the roomcode back to the host so it can be displayed
    hostSocket.emit("room:displayRoomCode", {roomCode})
}

function joinRoom(socket){
    socket.on("room:join", ({roomKey}) => {
        socket.join(roomKey)
    })
}
