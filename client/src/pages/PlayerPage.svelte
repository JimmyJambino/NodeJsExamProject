<script>
    import {  onMount} from "svelte"
    import { isLoggedIn, playTime } from "../store/generalStore.js"
    export let socket
    let playerNumber
    let input
    //let roomKey
    //import socket from "../App.svelte"
    
    socket.on("room:gameStarted", () => {
        console.log("Game Started!")
        startingGame()
    }) 
    socket.on("playerNumber", (data) => {
        playerNumber = data
    })

    function sendSignal() {
        //socket.emits
        socket.emit("fibdibanswer", input)
        console.log("Player Number:", playerNumber)
    }

    function startingGame() {
        const content = document.getElementById("content")
        content.innerHTML = "Game starting. Look at host screen."
    }
    
    // onMount( () => {
    //     playTime.set(true)
    // })
</script>
<div id=content> 
    Waiting for host to start game... 
</div>
<input bind:value={input}/>
<div id="buttons">
    <button on:click={sendSignal}>Send signal</button>
</div>