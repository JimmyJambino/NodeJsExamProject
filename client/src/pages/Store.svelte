<script>
import { onMount } from "svelte";
import {getAllGames,allGamesInTheStore} from "../store/gamesStore.js"
import Game from "../components/Game.svelte"

//const navigate = useNavigate()

onMount( async () => {
    const games = await getAllGames()
    $allGamesInTheStore = games
})

</script>


    <h3>Store</h3>
    <h3>Her er alle vores spil.. :DDDDD</h3>
    <div id="gamesTable">
    {#each $allGamesInTheStore as game (game.id)}
    <Game id={game.id}
        name={game.name}
        price={game.price}
        description={game.description}    
        />
    {/each}
    </div>


<style>
     #gamesTable {
         display: flex;
         justify-content: space-around;
         align-items: center;
         flex-wrap: wrap;
     }
</style>