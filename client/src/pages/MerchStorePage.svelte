<script>
import ProductCard from "../components/ProductCard.svelte";
import { merch } from "../store/gamesStore";



</script>

<div>
    {#each $merch as merch (merch.id)}
        <ProductCard productInfo={merch}/>
    {/each}

</div>

<style>

</style>



