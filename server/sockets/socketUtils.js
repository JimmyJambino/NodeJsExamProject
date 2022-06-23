export function getRoomBySocketId(roomMap, socketId) { // Finds a key (room) by the socket id
    for (let [key, value] of roomMap.entries()) {
        if(value.indexOf(socketId) !== -1) { // checks each key value array for the searchValue and returns key if found
            return key
        }
    }
}