<script>
export let optionAnswer
</script>

<div class="optionAnswer" style:background-color={optionAnswer.name === "Truth" ? "rgb(50, 215, 50, 0.8)" : "rgb(194, 178, 128, 0.8)"}>
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
    border-color: rgb(144, 128, 78);
    border-style: solid;
    border-radius: 0.5em;
    box-shadow: 3px 5px 25px rgb(120 120 120);
    min-width: 18vw;
    background-color: rgb(194, 178, 128, 0.8);
}
.option {
    border-color: rgb(194, 178, 128);
    border-style: solid;
    border-radius: 0.5em;
    padding: 5px;
    margin: 5px;
}
</style>