<script>
    export let answers // players + their answers
    
</script>

{#each answers as answer}
    <div class="answerBlock">
        <p class="answerText">
           {answer.input} 
        </p>
    </div>
{/each}

<style>
    .answerBlock {
        background-color: black;
    }
    .answerText {
        color: white;
    }
</style>