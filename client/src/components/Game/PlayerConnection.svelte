<script>
    export let player
</script>

{#if player != undefined}
<div id={player.name} class="connection">
    {player.name}
    <img class="connection" src="images/greenCircle.png" alt="player connection">
</div>
{:else}
<div class="connection">
    Open
    <img class="connection" src="images/greyCircle.png" alt="player connection">
</div>
{/if}

<style>
    .connection {
        max-width: 3em;
        max-height: 3em;
        /* color: white;
        font-size: 20px; */
    }
</style>