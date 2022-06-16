<script>

import {onMount} from "svelte"
import { navigate } from "svelte-navigator";
import PlayerConnection from "../components/PlayerConnection.svelte";
export let socket
let roomKey
let players = [] // check with sockets in the future
//import socket from "../App.svelte"

socket.on("room:playerHasJoined", player => {
    console.log(player.name)
    players.push(player) // apply spread operator instead for cleaner look
    players = players
}) 

onMount( () => {
    socket.emit("room:hostJoined")
    socket.on("room:displayRoomCode", (data) => {
        roomKey = data.roomKey // roomKey
        console.log("Roomkey:", roomKey)
        //displayMessage(roomKey)
    })
})

// function handleSend() {
//     const message = {messageInput}
//     console.log("LOGGING MESSAGE", message.messageInput);
//     //const room = roomInput.value
    
//     if (message.messageInput === "") return
//     displayMessage(message.messageInput)
    
//     messageInput = ""
// }
    
// function displayMessage(message) {
//     const div = document.createElement("div")
//     div.textContent = message
//     messageContainer.appendChild(div)
// }

function handleJoinRoom () {
    /*
    
joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value
})

    */
}

function startGame() {
    socket.emit("room:startGame", {roomKey}) // maybe include actual game so the players know what they're playing? Need to also change the {} in backend.
    navigate("FibOrDib")
}

</script>


<div class="container">
    <div>
        <h1>Room Key: {roomKey}</h1>
        
    </div>
    
    <div class="bottom">
        {#if players.length >= 2}
               <button on:click|preventDefault={startGame}>Start Game</button>
        {:else}
            Waiting for players...
        {/if}
        <div class="connectionList">
           {#each players as player}
               <PlayerConnection player={player}/>
           {/each}
        </div>
    </div>
    
</div>
    

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 90vH;
    }
    .connectionList {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
</style>