<script>
export let optionAnswer
//export let playerName
</script>

<div class="optionAnswer">
    <p>{optionAnswer.name}</p>
    <p>{optionAnswer.input}</p>
    <p>Who guessed: </p>
    {#each optionAnswer.tally as option}
        <div class="option">
            {option}
        </div>
    {/each}
</div>

<style>
.optionAnswer {
    font-size: 20px;
    color: white;
    border-width: 3px;
    border-color: black;
    border-style: solid;
}
.option {
    border-width: 3px;
    border-color: black;
    border-style: solid;
    padding: 5px;
}
</style>