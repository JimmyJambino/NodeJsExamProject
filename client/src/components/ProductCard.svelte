<script>

    import {navigate} from "svelte-navigator"
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition"
    import { cartList,ownedGames } from "../store/generalStore.js"
    

    export let productInfo;
    const { title, imgSrc, description, price, qty } = productInfo;

    const dispatch = createEventDispatcher();

    function checkIfInCartOrOwned(cart,ownedGames) {
        let isBuyable = false;
        //checks the cart for items
        cart.forEach(element => {
            if (element.title == productInfo.title && productInfo.type == undefined ){
                isBuyable = true
            }
        });
        //checks if the account already owns the GAME
        ownedGames.forEach(element => {
            if (element.game_id === productInfo.id && productInfo.type != "clothing" ) {
                isBuyable = true
            }
        })

        return isBuyable
    }

    $: check = checkIfInCartOrOwned($cartList,$ownedGames)
    


    function addToCart() {
        dispatch("addToCart");
    }

</script>

<div class="card" on:click in:fly="{{y: 200, duration: 500}}">
    <h3>{title}</h3>

    <img src={imgSrc} alt="" />

    <div id="description-wrapper">
        <p id="description">{description}</p>
    </div>

    <div id="stock-buy-wrapper">
        <div id="price-wrapper">
            <p id="price">{price},-</p>
        </div>
        <div class="stock-buy">
            {#if qty}
                <p>in stock: {qty}</p>
            {/if}
            {#if !check} <!-- checks if the item is in the cart or already owned  -->
            <button id="buy-btn" on:click|stopPropagation={() => { addToCart(productInfo)}}>Add to cart</button>
            {/if}
        </div>
    </div>
</div>

<style>
    p {
        color:rgba(0, 0, 0, 1)
    }
    .card {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        width: 20em;
        height: 30em;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.3s ease-in-out;
        padding: 0em 1em;
        margin: 1em;
        background-color: rgba(255, 255, 255, 0.25) ;
        cursor: pointer;
    }

    .card:hover {
        box-shadow: 5px 10px 15px rgb(13, 103, 239);

    }

    img {
        width: 20em;
        height: 13em;
        object-fit: contain;
        background-color: rgba(128, 128, 128, 0.25);
    }

    #description-wrapper {
        height: 20%;
        overflow: hidden;
    }

    #description {
        text-align: left;
    }

    #stock-buy-wrapper {
        margin-top: auto;
        width: 100%;
    }

    #price-wrapper {
        display: flex;
        justify-content: flex-end;
    }

    #price {
        font-weight: bold;
    }

    .stock-buy {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    #buy-btn {
        justify-self: flex-end;
        border-radius: 5px;
        font-weight: bold;
        color: darkgoldenrod;
        background-color: darkslategrey;
    }
</style>
