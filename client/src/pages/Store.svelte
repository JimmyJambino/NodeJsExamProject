<script>
import { onMount } from "svelte";
import {getAllGames,allGamesInTheStore} from "../store/gamesStore.js"
import Game from "../components/Game.svelte"
import ProductCard from "../components/ProductCard.svelte";

//const navigate = useNavigate()

onMount( async () => {
    let games = await getAllGames()
    games = games.map(game => {
        return {
            id: game.id,
            title: game.name,
            imgSrc: game.imgSrc,
            description: game.description,
            price: game.price,
            rating: game.rating
        }
    })
    $allGamesInTheStore = games
})

</script>

    <div id="games-table">
        <div id="games-table-wrapper">
            {#each $allGamesInTheStore as game (game.id)}
                <ProductCard productInfo={game}/>
            {/each}
        </div>
    </div>


<style>

    
    #games-table-wrapper{
       display: flex;
       flex-wrap: wrap;
       width: 80vw;
    }

     #games-table {
         display: flex;
         flex-wrap: wrap;
         justify-content: center;
         width: 100%;
     }

</style>