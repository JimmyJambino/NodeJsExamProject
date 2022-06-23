<script>
    export let items = [];
    import { cartList } from "../../store/generalStore";
    import {fade} from "svelte/transition"

    function handleDelete(title) {
        items = items.filter(game => game.title != title)
        $cartList = items
    }

console.log(items);
</script>

{#each items as item}
    <tr>
    {#each Object.keys(item) as key}  <!-- Object.keys(item) returns an array of all the keys in the object-->
    {#if key != "id"}
        {#if key.toString() == "product"} <!-- picture key-->
            <td> <img src='{item[key]}' alt='Avatar of item' /> </td>
        {:else}
        <td>{item[key]} </td> <!-- "key" would just give "name" or "email".. We need to specify it's from the item-->
        {/if}
    {/if}
    {/each}
        <td><button class="button-87" out:fade on:click|preventDefault={handleDelete(item.title)}>Delete item</button></td>
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
        justify-content: center;
        text-align: center;
        padding: 8px;
        display: table-cell;
        vertical-align: middle;
        height: 4rem;
        width: 10rem;
        font-size: large;
        color: white;
        
    }


/* CSS */
.button-87 {
  margin: 0 auto;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-87:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.button-87:active {
  transform: scale(0.95);
}
</style>