<script>
    import {cartList} from "../store/generalStore.js"
    import { navigate } from "svelte-navigator"
    import {allMerch} from "../store/merchStore.js"
    import { toast } from "@zerodevx/svelte-toast";
    
    
    
    export let id

//finds a game by ID in the svelte store
function findMerch(id) {
    const merchArray = $allMerch;
    const merchIndex = merchArray.findIndex(item => item.id === Number(id))
    
    if(merchIndex !== -1){
        return merchArray[merchIndex]
    }
}

    const merch = findMerch(id)

    function handleAddToCart() {
        console.log("FIRE",merch);
        const alteredMerch = {id: merch.id, product: merch.imgSrc, title: merch.title,  price: merch.price}
        const cart = $cartList 
        $cartList = [...cart, alteredMerch];

        toast.push(`Added ${merch.title} to cart`, {
            theme: {
                "--toastBackground": "#48BB78",
                "--toastBarBackground": "#2F855A",
            },
        });
    }

</script>

<div id="wrapper">
    <div id="outer">
    
    <div id="leftVideoBox">
        <p class="titleFont">{merch.title}</p>
    </div>

    <div id="rightDescriptionBox">
        <img src={merch.imgSrc} alt="">
        <h3 class="rightText">{merch.description}</h3>
        <h3 class="rightText">Overall ratings: LOL</h3>
            
        <div id="buttonBox">
            <button class="button-33" on:click|stopPropagation={() => {handleAddToCart(merch)}}>Add to cart</button>
            <button class="button-33" on:click="{() => navigate("/cartList")}">Go to cart</button>
        </div>
    </div>
    </div>
</div>
<!-- <button class="button-13" role="button" on:click="{() => navigate(-1)}">Back to games page</button> -->
<style>
    .rightText {
        color: rgba(254, 255, 198);
    }
    #wrapper {
        display: flex;
        justify-content: center;
        flex-direction: row;
	    min-height: calc(100vh - 15vh - 1rem);
        background: rgb(0,38,54);
        background: linear-gradient(90deg, rgba(0,38,54,1) 0%, rgba(3,61,85,1) 30%, rgba(0,38,54,1) 70%);
    }
    #outer {
        display: flex;
        justify-content: center;
        flex-direction: row;
        width: 100vw;
        height: 86%;
        margin:0;
        padding-bottom: 1em;
        
    }
    .smallImg{
        width: 30%;
        height: 6em;
        object-fit: cover;
    }
    img {
        width: 100%;
        height: 13em;
        object-fit: cover;
    }
    #scroll {

        height: 7em;
        overflow-x: scroll;
        overflow-y: hidden;
        padding: 0;
        white-space: nowrap;
    }
    #rightDescriptionBox{ 
        width: 30%;
        display: flex;
        flex-direction: column;
        
        padding: 1em
        
    }
    #leftVideoBox{
        display: flex;
        flex-direction: column;
        width: 40%;
        padding: 2rem 0;
        height:100%;
    }
    #buttonBox {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 2rem 0 ;
    }

    .titleFont {
        font-family: Verdana, Tahoma, sans-serif;
        font-size: xx-large;
        font-weight: bolder;
        color: rgb(254, 255, 198);
    }

    .button-33 {
    background-color: #c2fbd7;
    border-radius: 100px;
    width: 10rem;
    height: 4rem;
    box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
    color: green;
    cursor: pointer;
    display: inline-block;
    font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
    padding: 7px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 16px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    }

    .button-33:hover {
    box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
    }

/* CSS */
.button-13 {
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember",sans-serif;
  font-size: 13px;
  line-height: 29px;
  padding: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;
}

.button-13:hover {
  background-color: #f7fafa;
}

.button-13:focus {
  border-color: #008296;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  outline: 0;
}

    #rightBox {
        background-color: darkkhaki;
        width: 30%;
        height: 100%;
        display: flex;
        float:right;

    }

</style>