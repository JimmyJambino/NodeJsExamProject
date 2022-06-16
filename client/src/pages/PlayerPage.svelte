<script>
    import {onMount} from "svelte"
    import {currentUser, playTime} from "../store/generalStore.js"
    export let socket
    //let roomKey
    //import socket from "../App.svelte"
    
    socket.on("room:gameStarted", () => {
        console.log("Game Started!")
        startingGame()
    }) 

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