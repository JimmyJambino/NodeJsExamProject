<script>
// Rename to Hostpage? Makes more sense as the game actually runs here on the host, and it isn't *just* a room.
import {onMount} from "svelte"
import { navigate } from "svelte-navigator";
import PlayerConnection from "../components/PlayerConnection.svelte";
import HostOptions from "../components/Game/HostOptions.svelte";
export let socket
let looking = false
let body
let top = ""
let roomKey
const players = [undefined, undefined, undefined, undefined] // check with sockets in the future, add to Store?
let numberOfPlayers = 0 // to Store
let gameRunning = false // to Store

socket.on("room:playerHasJoined", player => {
    for(let i = 0; i < players.length; i++) {
        if(players[i] == undefined) {
            players[i] = player
            numberOfPlayers++
            //socket.emit("playerNumber", {id: player.id, number: i+1})
            break
        }
    }
    players = players // reactive update 
    //numberOfPlayers = numberOfPlayers
    //console.log("players:", players)
}) 

socket.on("disconnectedPlayer", (data) => {
    console.log("Disconnected player:", data)
    for(let i = 0; i < players.length; i++) {
        if(players[i] !== undefined && players[i].id === data) { // finds the socket.id from the disconnected player and removes them from the game (visually)
            players[i] = undefined
            numberOfPlayers--
            break
        }
    }
    players = players
    //numberOfPlayers = numberOfPlayers
    console.log("players:", players)
})

onMount( () => {
    socket.emit("room:hostJoined")
    socket.on("room:displayRoomCode", (data) => {
        roomKey = data.roomKey // roomKey
        console.log("Roomkey:", roomKey)
    })
})

let answers = [] // players submitted input answers
let playerChoices = [] // players submitted choices
let hostPrompts // these are the questions or tasks that the host will assign to the players.
let countDown = 5
let awaiting = false
async function startGame() {
    socket.emit("room:startGame", {roomKey}) // maybe include actual game so the players know what they're playing? Need to also change the {} in backend.
    //const bottom = document.getElementById("bottom")
    top = "Game is starting..."
    gameRunning = true // set this to false somewhere else?
    const array = await fetch("/api/randomQuestions/5")
    hostPrompts = await array.json()
    setTimeout(() => {
        top = "You are about to play Fib Or Dib!"
    }, 2000)

    setTimeout(() => {
        top = hostPrompts[0].question
        body = "Please submit your answers!"
        socket.emit("room:startRound", {roomKey}) // emits signal to start a round to the players, awaits inputs
        fibDib()
        setInterval(() => {
        countDown--
    },1000)
    }, 5000)
} // At the end of this function, call another socket emit to let the host and players know? Or just emit to players?

function fibDib() {
    setTimeout(() => {
        looking = true
        awaiting = false
        body = undefined
        const correctAnswer = {
            input: hostPrompts[0].answer,
            socketId: socket.id
        }
        answers.push(correctAnswer)
        shuffleAnswers() // shuffles the answers so that players can't tell which one is correct based on order.
        socket.emit("room:fibdibArrayAnswer", answers)
    }, 10000) // 10 seconds
}

//TODO: EXPLAIN THIS TO THE GUYS
function shuffleAnswers() {
    for(let i=0; i < answers.length; i++) {
        const randomIndex = Math.floor(Math.random() * answers.length)
        answers[i] = answers.splice(randomIndex, 1, answers[i])[0]
    }
}

socket.on("room:inputAnswer", (data) => { // data = {input, socketId}
    //console.log("hostpage:", data)
    answers.push(data) // data contains player and their answer, remember to clear the answers or somehow else handle it when the next round starts.
})
socket.on("player:receiveOptions", (data) => { // includes {socketId, choice, optionOwner}
    playerChoices.push(data)
    console.log("Player choice: ", data)
})

</script>



<div class="container">
    <div class="roomKey">
        <h1>Room Key: {roomKey}</h1>
    </div>
    <div class="top">
        {top}
    </div>

    <div id="body" class="body">
        {#if body}
            {body}
        {/if}
            
        {#if awaiting}
        {"/n"}
            Countdown: {countDown}
        {/if}
        
        {#if looking}
            <HostOptions answers={answers}/>
        {/if}
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