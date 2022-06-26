<script>
    import { onMount } from "svelte"
    import PlayerOption from "../components/Game/PlayerOption.svelte";
    import {awaitingOptionInput, awaitingTextInput} from '../store/gameControllerStore.js'
    export let socket
    $:playerOptions = [] // {player, option}

    let input //
    let playerSocket = socket
    let header = "Waiting for host to start game... " // why doesn't this variable need $? it is still reactive tho?
    
    socket.on("room:gameStarting", () => {
        console.log("Game Starting!")
        awaitingOptionInput.set(false)
        awaitingTextInput.set(false)
        startingGame()
    }) 

    socket.on("room:startedRound", () => {
        console.log("Round Started!")
        startRound()
    })

    socket.on("room:options", (optionArray) => { // consists of players with {owner, input, tally} use socket.id as the player, but tally is not used here.
        playerOptions = optionArray //  Timing needs to be fixed.
        awaitingOptionInput.set(true)
        awaitingTextInput.set(false)
        header = "Choose an answer!"
    })

    function sendInputAnswer() {
        const answer = {
            owner: socket.id,
            input
        }
        socket.emit("player:inputAnswer", answer)
        input = ""
        header = "Waiting for others."
        awaitingTextInput.set(false)
    }

    function startingGame() { // Initialize the game
        header = "Game starting. Look at host screen."
    }

    function startRound() { // Initialize a round
        header = "Type in your lie!" // Or if you can't make one up, choose lie for me!
        awaitingTextInput.set(true)
    }
    
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
        font-size: 20px;
        color: white;
    }
    .header {
        padding: 5vh;
    }
    .inputs {
        padding: 5vh;
    }
</style>