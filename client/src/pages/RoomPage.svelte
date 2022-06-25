<script>
// Rename to Hostpage? Makes more sense as the game actually runs here on the host, and it isn't *just* a room.
import {onMount} from "svelte"
import PlayerConnection from "../components/Game/PlayerConnection.svelte";
import { awaitingOptionInput, awaitingTextInput } from "../store/gameControllerStore";
import RoundScore from "../components/Game/RoundScore.svelte";
import {fade, fly} from 'svelte/transition'
import { transition_in } from "svelte/internal";
export let socket
let gameMusic = new Audio('audio/themesong.mp3') // mySound.loop = true, to loop
gameMusic.volume = 0.2;
const players = [undefined, undefined, undefined, undefined] // check with sockets in the future, add to Store? Contains name
let numberOfPlayers = 0 // to Store

let showingResults = false
let body
let top = ""
let roomKey

let gameRunning = false // to Store

// ##############################################################
// ################ SOCKETS FOR CONNECTIONS #####################
// ##############################################################
socket.on("room:playerHasJoined", player => {
    console.log("player:", player)
    for(let i = 0; i < players.length; i++) {
        if(players[i] == undefined) {
            players[i] = player
            numberOfPlayers++
            break
        }
    }
}) 

// ###### NEED AN OPTION TO BOOT ALL PLAYERS
socket.on("room:disconnectedPlayer", (player) => {
    //console.log("Disconnected player:", player)
    for(let i = 0; i < players.length; i++) {
        if(players[i] !== undefined && players[i].id === player) { // finds the socket.id from the disconnected player and removes them from the game (visually)
            players[i] = undefined
            numberOfPlayers--
            break
        }
    }
    //console.log("players:", players)
})

onMount( () => {
    socket.emit("room:hostJoined")
    socket.on("room:displayRoomCode", (data) => {
        roomKey = data.roomKey // roomKey
        console.log("Roomkey:", roomKey)
    })
})
// ##############################################################
// #################### ROUND TIMERS ############################
// ##############################################################

let hostPrompts // these are the questions or tasks that the host will ask to the players.
let optionArray = [] // this will contain the options based on the submitted answers, and will also have the tally and count and everything yayeet
let countDown = 0
let countDownInterval // Interval

function controlInterval() {
    if(countDown <= 0) {
        stopCountDown()
        awaitingOptionInput.set(false)
        awaitingTextInput.set(false)
    } else {
        countDown--
    }  
}

function startCountDownInSeconds(fn, seconds) {
    countDown = seconds
    return setInterval(fn, 1000)
}

function stopCountDown() {
    clearInterval(countDownInterval)
}

async function startGame() {
    gameMusic.play() // stop at some time
    socket.emit("room:startGame", {roomKey}) // maybe include actual game so the players know what they're playing? Need to also change the {} in backend.
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
        awaitingTextInput.set(true)
        countDownInterval = startCountDownInSeconds(controlInterval, 10)
        startRound()
    }, 5000) 
} // At the end of this function, call another socket emit to let the host and players know? Or just emit to players?

function startRound() {
    setTimeout(() => {
        body = undefined
        const correctOption = {
            name: "Truth", owner: socket.id, input: hostPrompts[0].answer, tally: []
        }
        optionArray.push(correctOption)
        shuffleAnswers() // shuffles the answers so that players can't tell which one is correct based on order.
        socket.emit("room:optionArray", optionArray) // sends the option array to the players
        countDownInterval = startCountDownInSeconds(controlInterval, 5)
        showResults()
    }, 10000) // 10 seconds
}

function showResults() { 
    setTimeout(() => {
        console.log("End of round, scores are being displayed.")
        countDownInterval = startCountDownInSeconds(controlInterval, 5)
        showingResults = true // just shows the submitted answers, doesn't wait for emit or signal.
        // emit signal to players to remove their options
    }, 5000) // 5 seconds after users have had the chance to submit choices
    // Should there be a small break in between phases?
}

// ##############################################################
// ############# SOCKETS FOR INPUTS FROM PLAYERS ################
// ##############################################################
socket.on("room:inputAnswer", (answer) => { // data = {input, socketId}
    let playerName // can this be written better?
    players.forEach((player) => {
        if(player !== undefined && (player.id === answer.owner)) { // double check?
            playerName = player.name // undefined right now??
        }
    })

    const option = { 
        name: playerName,
        owner: answer.owner,
        input: answer.input, // the answer
        tally: [] // contains the players that have submitted this choice as their answer
    }
    optionArray.push(option)
})

socket.on("room:optionAnswer", (optionAnswer) => { // rename socket to reflect action, player --> room --> host?
    const search = (target) => {
        console.log("target", target)
        console.log("optionAnswer:", optionAnswer)
        return target.id === optionAnswer.player
    }

    let index = players.findIndex(search)

    optionArray.forEach((opt) => {
        if(opt.owner === optionAnswer.owner) { // finding the relevant option owner
            opt.tally.push(players[index].name)
            return
        }
    })
})

//TODO: EXPLAIN THIS TO THE GUYS
function shuffleAnswers() {
    for(let i=0; i < optionArray.length; i++) {
        const randomIndex = Math.floor(Math.random() * optionArray.length)
        optionArray[i] = optionArray.splice(randomIndex, 1, optionArray[i])[0]
    }
}
function nextRound() {
    // save score
    // save the question we're at
    // check if question array length is ok
    // repeat a round
}

</script>

<div class="container">
    <div class="roomKey">
        <h1>Room Key: {roomKey}</h1>
    </div>
    <div class="top" >
        {#key top}
            <p transition:fly="{{y: -200, duration: 300}}">{top}</p>
        {/key}
    </div>

    <div class="body">
        {#if body}
            {#key body}
                <p transition:fade>{body}</p>
            {/key}
        {/if}
            
        {#if countDown >= 0 && ($awaitingOptionInput || $awaitingTextInput)}
        <br>
            <p transition:fade>Countdown: {countDown}</p>
        {/if}
        
        {#if showingResults}
        <div class="results" transition:fade>
            {#each optionArray as option}
                <RoundScore optionAnswer={option}/>
            {/each}
        </div>
        <button transition:fade on:click={}>Next Round</button>
        {/if}
    </div>
    
    <div class="bottom">
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
    .roomKey {
        font-size: 30px;
        /* color: white; */
    }
    .top {
        display: flex;
        /* font-size: 20px;
        color: white; */
    }
    .bottom {
        display: flex;
        flex-direction: column;
        min-width: 500px;
        /* font-size: 20px;
        color: white; */
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 90vH;
        font-size: 20px;
        color: white;
    }
    .connectionList {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .body {
        /* size: 15px; */
    }
    .results {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 85vw;
    }
</style>