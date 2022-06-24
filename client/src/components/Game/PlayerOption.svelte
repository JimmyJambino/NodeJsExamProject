<script>
    import {awaitingOptionInput} from '../../store/gameControllerStore.js'

    // Should be a check that the players own lie isn't an option
    export let playerOption // input from a player which is an option, and the socketid that submitted it
    export let playerSocket // the socket from the player that chooses the option
    function sendOptionAnswer() {
        // Send player (id/number)
        const optionAnswer = {
            owner: playerOption.owner, // the owner player id
            answer: playerOption.answer, // the choice, might need to rename answer/input to be uniform across the pages
            player: playerSocket.id // the choosing player
        }
        //console.log("player number:", playerAnswer.playerNumber)
        playerSocket.emit("player:optionAnswer", optionAnswer) // should we also update the host page with who gave the answer right away? Then we can see who we're waiting for.
        awaitingOptionInput.set(false)
    }
</script>

<button class="button" on:click={sendOptionAnswer}>{playerOption.input}</button>

<style>
    .button {
        width: 50vw
    }
</style>