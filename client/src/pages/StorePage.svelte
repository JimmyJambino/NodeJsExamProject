<script>
    import { onMount } from "svelte";
    import { getAllGames, allGamesInTheStore } from "../store/gamesStore.js";
    import { cartList } from "../store/generalStore.js"
    import { useNavigate } from "svelte-navigator";
    import ProductCard from "../components/ProductCard.svelte";

    const navigate = useNavigate();

    onMount(async () => {
        let games = await getAllGames();
        games = games.map((game) => {
            return {
                id: game.id,
                title: game.name,
                imgSrc: game.imgSrc,
                description: game.description,
                price: game.price,
            };
        });
        $allGamesInTheStore = games;
    });

    function handleInspect(id) {
        console.log("uwu store")
        navigate("/store/" + id, true)
    }

    function addToCart(item){
        $cartList = [...$cartList, item]
        console.log("uwu cart")
        console.log($cartList)
    }

</script>

<h3>Store</h3>
<h3>Her er alle vores spil.. :DDDDD</h3>
<div id="games-table">
    <div id="games-table-wrapper">
        {#each $allGamesInTheStore as game (game.id)}
            <ProductCard
             productInfo={game}
             on:click={() => handleInspect(game.id)}
             on:addToCart={() => addToCart(game)}
             
             />
        {/each}
    </div>
</div>

<style>
    #games-table-wrapper {
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
