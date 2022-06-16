<script>
    import { allGamesInTheStore,cartList } from "../store/gamesStore";
    import { useNavigate } from "svelte-navigator"

    export let id = 3;

    const navigate = useNavigate()


    function findGame(id) {
        const gameArray = $allGamesInTheStore;
        const selectedGameIndex = gameArray.findIndex(item => item.id === Number(id))
        if(selectedGameIndex !== -1){
            return gameArray[selectedGameIndex]
        }
    }
    
    const selectedGame = findGame(id)
    //items har disse keys: id, name, price, description

    let customerCart = $cartList

    function handleAddToCart() {
        customerCart.push(selectedGame)
        $cartList = customerCart
        console.log(customerCart);
        console.log($cartList);
    }
</script>

<div style="height: 70vh; display:block; background-color: red">
    
    <div id="itemBox">
        <p>Lol</p>
        <div id="innerBox">
        <p>Item name:
            {selectedGame.name}</p>
        <p>Price:
            {selectedGame.price}</p>

            <button on:click|preventDefault={handleAddToCart}>Add to cart</button>
            <button on:click="{() => navigate("/cartList")}">Go to cart</button>
            <button on:click="{() => navigate(-1)}">Back to games page</button>
        </div>
    </div>
</div>

<style>
    #itemBox{ 
        background-color: blanchedalmond;
        width: 70%;
        height: 100%;
        display: flex;
        float: left;
        align-items: flex-end;
    }
    #innerBox{
        display: flex;
        float: left;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-evenly;
        width: 50%;
        height: 30%;
        background-color: aquamarine;
    }
    p {
        display: flex;
        width: 30%;
        height: 40%;
        padding: 2px;
        border-color: black;
        border-style: solid;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    #rightBox {
        background-color: darkkhaki;
        width: 30%;
        height: 100%;
        display: flex;
        float:right;

    }

</style>