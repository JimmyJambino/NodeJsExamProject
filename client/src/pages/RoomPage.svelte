<script>

import {onMount} from "svelte"

export let socket
let roomKey
let joinRoomButton
let messageInput = ""
let roomInput = ""
let form
let messageContainer
//import socket from "../App.svelte"

socket.on("room:playerHasJoined", playerName => {
    displayMessage(playerName)
    console.log(playerName)
}) 


onMount( () => {

    displayMessage("lol")
    displayMessage(socket.id)
    //socket.emit("hostJoined", ({roomKey: "poop"}))
    socket.emit("room:hostJoined")
    socket.on("room:displayRoomCode", (data) => {
        roomKey = data.roomKey // roomKey
        console.log("Roomkey:", roomKey)
        displayMessage(roomKey)
    })
    
})

function handleSend() {
    const message = {messageInput}
    console.log("LOGGING MESSAGE", message.messageInput);
    //const room = roomInput.value
    
    if (message.messageInput === "") return
    displayMessage(message.messageInput)
    
    messageInput = ""
}
    

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    messageContainer.appendChild(div)
}

function handleJoinRoom () {
    /*
    
joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
})

    */
}


</script>

<div id="outerDiv">
    <div bind:this={messageContainer} id="message-container"></div>
        <form bind:this={form} id="form">
        <label for="message-input">Message</label>
        <input bind:value={messageInput} id="message-input">
        <button on:click|preventDefault={handleSend} type="submit" id="send-button">Send</button>

        <label for="room-input">Room</label>
        <input bind:value={roomInput} type="text" id="room-input">
        <button bind:this={joinRoomButton} type="button" id="room-button">Join</button>
        </form>
    
</div>

<style>

    #outerDiv {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        width: 90%;
        max-width: 1200px;
    }

    #message-container {
        border: 1px solid black;
        flex-grow: 1;
        overflow-y: auto;
    }

    #message-container div {
        background-color: #CCC;
        padding: 5px;
    }

</style>






