<script>
    import { cartList } from "../store/gamesStore";
    import {navigate} from "svelte-navigator"
    import ItemTable from "../components/Table/ItemTable.svelte"
    
    

    let headers = $cartList
    if (headers != null && headers != undefined && headers.length >0) {
        console.log("Ups");
        headers = Object.keys($cartList[0])
    }

    function handleBuySubmit() {
        navigate("paymentPage")
    }

</script>

<div>
    <p>Smiler</p>
    {#if headers != null && headers != undefined && headers != []}
        <ItemTable headers={headers} items={$cartList}> </ItemTable>
        <button on:click|preventDefault={handleBuySubmit}>Buy now</button>
    {/if}
    <!-- {#if $currentUser != null} -->
    

    </div>

<style>

</style>