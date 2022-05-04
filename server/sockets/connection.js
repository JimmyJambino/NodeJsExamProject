function connection(socket) {
    socket.on("test", (data) => {
        console.log(data)
    })
}

export default connection