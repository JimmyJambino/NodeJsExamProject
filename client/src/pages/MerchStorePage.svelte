<script>
import ProductCard from "../components/ProductCard.svelte";
import {cartList} from "../store/generalStore.js"
import {onMount} from "svelte"
import {getAllMerch, allMerch} from "../store/merchStore.js"
import {navigate} from "svelte-navigator"
import { toast } from "@zerodevx/svelte-toast";

onMount( async () => {
    let merch = await getAllMerch()
    merch = merch.map( (merch) => {
        return {
            id: merch.id,
            title: merch.name,
            imgSrc: merch.imgSrc,
            description: merch.description,
            price: merch.price,
            type: "clothing"
        }
    })
    $allMerch = merch
})

function handleInspect(id) {
        navigate("/merch/" + id, true);
    }

function addToCart(item) {
    const alteredItem = {id: item.id, product: item.imgSrc, title: item.title,  price: item.price, type: item.type}
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
        {#each $allMerch as merch (merch.id)}
            <ProductCard productInfo={merch}
            on:click={() => handleInspect(merch.id)}
            on:addToCart={() => addToCart(merch)}
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
    

