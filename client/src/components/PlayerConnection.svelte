<script>
    export let player
</script>
<div id={player.name} class="connection">
    {player.name}
    <img class="connection" src="images/greenCircle.png" alt="player connection">
</div>

<style>
    .connection {
        max-width: 3em;
        max-height: 3em;
    }
</style>