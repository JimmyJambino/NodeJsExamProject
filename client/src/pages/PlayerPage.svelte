<script>
    import {onMount} from "svelte"
    import PlayerOption from "../components/Game/PlayerOption.svelte";
    import {awaitingOptionInput, awaitingTextInput} from '../store/gameControllerStore.js'
    export let socket
    $:playerOptions = [] // {player, option}
    let playerNumber
    let input // textInput from the player

    //$:multipleChoice = false
    $:textInput = true // needs to be set from the host socket emit
    let playerSocket = socket
    let header = "Waiting for host to start game... " // why doesn't this variable need $? it is still reactive tho?
    
    socket.on("room:gameStarting", () => {
        console.log("Game Starting!")
        startingGame()
    }) 

    socket.on("player:startedRound", () => {
        console.log("Round Started!")
        startRound()
    })

    socket.on("playerNumber", (data) => {
        playerNumber = data
    })
    socket.on("player:options", (array) => { // consists of players with {input, socketId} use socket.id as the player
        playerOptions = array //  Timing needs to be fixed.
        awaitingOptionInput.set(true)
        header = "Choose an answer!"
    })

    function sendInputAnswer() {
        const answer = {
            input,
            socketId: socket.id
        }
        socket.emit("room:inputAnswer", answer)
        //textInput = false
        awaitingTextInput.set(false)
    }

    function startingGame() { // Initialize the game
        header = "Game starting. Look at host screen."
    }

    function startRound() { // Initialize a round
        header = "Type in your lie!" // Or if you can't make one up, choose lie for me!
        awaitingTextInput.set(true)
    }
    
    onMount( () => {
        //playTime.set(true)
        // player = {
        //     playerId: socket.id, 
        // }
    })
    
</script>
<div class="content">
    <div class="header"> 
        {header}
    </div>
    <div class="inputs">

        {#if $awaitingOptionInput}
            {#each playerOptions as playerOption}
                <PlayerOption playerSocket={playerSocket} playerOption={playerOption}/>
            {/each}
        {/if}

        {#if $awaitingTextInput}
        <div class="buttons">
            <input bind:value={input}/>
            <button on:click={sendInputAnswer}>Submit Answer</button>
        </div>
        {/if}
    </div>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>