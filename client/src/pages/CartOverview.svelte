<script>
    import { cartList } from "../store/gamesStore";
    import {navigate} from "svelte-navigator"
    import ItemTable from "../components/Table/ItemTable.svelte"
    import {currentUser} from "../store/generalStore.js"
    

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
    {#if $currentUser != null}
        <button on:click|preventDefault={handleBuySubmit}>Buy now</button>
    {/if}
    {#if $currentUser == null}
        <button disabled='true' on:click|preventDefault={handleBuySubmit}>Log in</button>
    {/if}
    {/if}
    <!-- {#if $currentUser != null} -->
    

    </div>

<style>

</style>