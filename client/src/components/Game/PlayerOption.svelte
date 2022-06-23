<script>
    import {awaitingOptionInput} from '../../store/gameControllerStore.js'
    export let playerOption // input from a player which is an option, and the socketid that submitted it
    export let playerSocket // the socket from the player that chooses the option
    function onPlayerClick() {
        // Send player (id/number)
        const playerChoice = {
            playerId: playerSocket.id, // the choosing player id
            choice: playerOption.input, // the choice
            optionOwner: playerOption.socketId // the choice owner
        }
        //console.log("player number:", playerAnswer.playerNumber)
        playerSocket.emit("room:optionsAnswer", playerChoice) // should we also update the host page with who gave the answer right away? Then we can see who we're waiting for.
        awaitingOptionInput.set(false)
    }
</script>

<button class="button" on:click={onPlayerClick}>{playerOption.input}</button>

<style>
    .button {
        width: 50vw
    }
</style>