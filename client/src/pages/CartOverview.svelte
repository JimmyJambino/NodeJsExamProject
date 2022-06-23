<script>
    import { cartList } from "../store/generalStore.js";
    import {navigate} from "svelte-navigator"
    import ItemTable from "../components/Table/ItemTable.svelte"
    import { isLoggedIn } from "../store/generalStore.js"
    import { onMount } from "svelte"

    let headers = $cartList
    if (headers != null && headers != undefined && headers.length >0) {
        headers = Object.keys($cartList[0])
    }

    function handleBuySubmit() {
        navigate("paymentPage")
    }

    
 
    let initialValue = 0;
    
    //reducer function for total price of the cart
    $: totalSum = $cartList.reduce(function (total, item) {
        return total + item.price;
    }, initialValue);

</script>

<div id="outer">
    <div id="tableDiv">
        
    {#if headers != null && headers != undefined && headers != []}
    <ItemTable headers={headers} items={$cartList}> </ItemTable>
    {/if}


</div>

    <div id="totalBox">
    <h2>Resume</h2>
    <hr class="rounded">
    <h5>Spend an extra X amount for 100 party points!</h5>
    <hr class="rounded">
    <div id="amountBox">
        <h3 class="price">Total amount: {totalSum}</h3>
    </div>
    {#if $isLoggedIn != null}
    <button class="button-3" on:click|preventDefault={handleBuySubmit}>Buy now</button>
    {/if}
    {#if $isLoggedIn == null}
    <button class="button-3" disabled='true' on:click|preventDefault={handleBuySubmit}>Log in to buy</button>
    {/if}

    </div>
    
</div>

<style>

    h3.price{
        padding-right: 2rem;
    }
    h5 {
        font-weight: lighter;
    }
    /* Rounded border */
    .rounded {
        display: block;
        width: 95%;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        border-style: inset;
        border-width: 1px;
        color: grey;
        border-top: 8px solid #bbb;
        border-radius: 5px;
    }

    #outer {
        display:flex;
        justify-content: center;
        width: 90%;
        margin: 0 auto;
        padding-top: 2rem;
    }

    #tableDiv {
        padding-right:1rem;
        margin: 0 auto;
        display:flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
    }

    #totalBox {
        display: flex;
        flex-direction: column;
        width: 30%;
        height: 50%;
        background-color: rgba(255, 255, 255, .05);
        color: white;
    }
    #amountBox {
        display: flex;
        width: 100%;
        justify-content: right;
    }
    
    /* BUTTON CSS */
    .button-3 {
      appearance: none;
      background-color: #2ea44f;
      border: 1px solid rgba(27, 31, 35, .15);
      border-radius: 6px;
      box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      padding: 6px 16px;
      position: relative;
      text-align: center;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;
      white-space: nowrap;
    }
    
    .button-3:focus:not(:focus-visible):not(.focus-visible) {
      box-shadow: none;
      outline: none;
    }
    
    .button-3:hover {
      background-color: #2c974b;
    }
    
    .button-3:focus {
      box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
      outline: none;
    }
    
    .button-3:disabled {
      background-color: #94d3a2;
      border-color: rgba(27, 31, 35, .1);
      color: rgba(255, 255, 255, .8);
      cursor: default;
    }
    
    .button-3:active {
      background-color: #298e46;
      box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
    }

</style>