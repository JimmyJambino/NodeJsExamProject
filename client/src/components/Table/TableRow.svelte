<script>
    export let items = [];
    import { cartList } from "../../store/generalStore";

    function handleDelete(title) {
        items = items.filter(game => game.title != title)
        $cartList = items
    }

</script>

{#each items as item}
    <tr>
    {#each Object.keys(item) as key}  <!-- Object.keys(item) returns an array of all the keys in the object-->
        {#if key.toString() == "product"} <!-- picture key-->
            <td> <img src='{item[key]}' alt='Avatar of item' /> </td>
        {:else}
        <td>{item[key]} </td> <!-- "key" would just give "name" or "email".. We need to specify it's from the item-->
        {/if}
        {/each}
        <td><button on:click|preventDefault={handleDelete(item.title)}>Delete item</button></td>
    </tr>
{/each}

<style>
    img {
        width: 5em;
        height: 4em;
        object-fit: contain;
        background-color: rgba(128, 128, 128, 0.25);
    }
   td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
        display: table-cell;
        vertical-align: middle;
        height: 4rem;
        width: 10rem;
        font-size: large;
        color: white;
        
    }
</style>