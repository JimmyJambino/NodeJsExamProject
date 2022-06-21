<script>

import {onMount} from "svelte"
import { navigate } from "svelte-navigator";
import PlayerConnection from "../components/PlayerConnection.svelte";
export let socket
let roomKey
const players = [undefined, undefined, undefined, undefined] // check with sockets in the future, add to Store?
let numberOfPlayers = 0 // to Store
let gameRunning = false // to Store
socket.on("room:playerHasJoined", player => {
    for(let i = 0; i < players.length; i++) {
        if(players[i] == undefined) {
            players[i] = player
            numberOfPlayers++
            socket.emit("playerNumber", {id: player.id, number: i+1})
            break
        }
    }
    players = players
    numberOfPlayers = numberOfPlayers
    console.log("players:", players)
}) 

socket.on("disconnectedPlayer", (data) => {
    console.log("Disconnected player:", data)
    for(let i = 0; i < players.length; i++) {
        if(players[i].id === data) {
            players[i] = undefined
            numberOfPlayers--
            break
        }
    }
    players = players
    numberOfPlayers = numberOfPlayers
    console.log("players:", players)
})

onMount( () => {
    socket.emit("room:hostJoined")
    socket.on("room:displayRoomCode", (data) => {
        roomKey = data.roomKey // roomKey
        console.log("Roomkey:", roomKey)
    })
})

const question = {quest: "lol 123", answer: "yes"}
let answers = []
function startGame() {
    socket.emit("room:startGame", {roomKey}) // maybe include actual game so the players know what they're playing? Need to also change the {} in backend.
    //navigate("FibOrDib") // keep RoomPage and change content for now
    const top = document.getElementById("top") // can these consts be added to onMount?
    const body = document.getElementById("body")
    const bottom = document.getElementById("bottom")
    top.innerHTML = "Game is starting..."
    gameRunning = true
    
    setTimeout(() => {
        top.innerHTML = question.quest // animate this.
        fibDib()
    }, 2000)
}

function fibDib() {
    const body = document.getElementById("body")
    setTimeout(() => {
        body.innerHTML = answers
    }, 50000)
}

socket.on("fibdibanswer", (data) => {
    answers.push(data)
})

</script>


<div class="container">
    <div id="top" class="top">
        <h1>Room Key: {roomKey}</h1>
        
    </div>

    <div id="body" class="body">

    </div>
    
    <div id="bottom" class="bottom">
        {#if numberOfPlayers >= 2 && !gameRunning}
               <button on:click|preventDefault={startGame}>Start Game</button>
        {:else if !gameRunning}
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
    .top {
        display: flex;
    }
    .bottom {
        display: flex;
        flex-direction: column;
        min-width: 500px;
    }
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