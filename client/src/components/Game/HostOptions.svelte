<script>
    export let choices // players + their answers
    
</script>

{#each choices as choice}
    <div class="answerBlock">
        <p class="answerText">
           {choice.input} 
           test 1 map
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