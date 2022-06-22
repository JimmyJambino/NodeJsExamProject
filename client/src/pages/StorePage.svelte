<script>
    import { onMount } from "svelte";
    import { useNavigate } from "svelte-navigator";
    import { toast } from "@zerodevx/svelte-toast";

    import { getAllGames, allGamesInTheStore } from "../store/gamesStore.js";
    import { cartList } from "../store/generalStore.js";
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
        navigate("/store/" + id, true);
    }

    function addToCart(item) {
        const alteredItem = {product: item.imgSrc, title: item.title,  price: item.price}
        const cart = $cartList 
        $cartList = [...cart, alteredItem];

        toast.push(`Added ${item.title} to cart`, {
            theme: {
                "--toastBackground": "#48BB78",
                "--toastBarBackground": "#2F855A",
            },
        });
    }
</script>


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
