<script>
    import { allGamesInTheStore } from "../store/gamesStore.js"
    import {cartList} from "../store/generalStore.js"
    import { useNavigate } from "svelte-navigator"
    import YouTube from 'svelte-youtube' //https://www.npmjs.com/package/svelte-youtube
    import { toast } from "@zerodevx/svelte-toast";

    export let id
    //pictures for showcasing...
    let img1 = "https://cdn.akamai.steamstatic.com/steam/apps/434170/ss_f236ee261683e4cd4c13dbd29b710af78a86392d.1920x1080.jpg?t=1597699274"
    let img2 = "https://jackboxgames.b-cdn.net/wp-content/uploads/2020/05/Screen-Shot-2020-05-18-at-2.12.41-PM.png"
    let img3 = "https://i.insider.com/57c9c418b996eb03258b5d5a?width=1200&format=jpeg"
    let img4 = "https://play-lh.googleusercontent.com/5PjYFPc8Eiz2l97BpwRPMJGXsYGBEFEBgEsIUL9clq4SCIp4v2-_HVfiX5cYsreFIg"
    let img5 = "https://www.gamingonlinux.com/cache/youtube_thumbs/5f7510c44e929da9ca24ccf9ea595c9c.jpg"
    let img6 = "https://ih1.redbubble.net/image.2645073770.4034/flat,750x1000,075,f.jpg"
   
    const navigate = useNavigate()

    //finds a game by ID in the svelte store
    function findGame(id) {
        const gameArray = $allGamesInTheStore;
        const selectedGameIndex = gameArray.findIndex(item => item.id === Number(id))
        if(selectedGameIndex !== -1){
            return gameArray[selectedGameIndex]
        }
    }
    
    const game = findGame(id)

    function handleAddToCart(item) {
        const alteredItem = {id: item.id, product: item.imgSrc, title: item.title,  price: item.price}
        const cart = $cartList 
        $cartList = [...cart, alteredItem];

        toast.push(`Added ${item.title} to cart`, {
            theme: {
                "--toastBackground": "#48BB78",
                "--toastBarBackground": "#2F855A",
            },
        });
    }

    function displayRatings() {
        let ratings = ""
        for (let i = 0; i <= game.rating; i++) {
            ratings += "⭐"
        }
        return ratings
    }
    
    const options = {
        height: '390',
        width: '640',
        //  see https://developers.google.com/youtube/player_parameters
        playerVars: {
            autoplay: 1
        }
    };
    
    $: check = checkIfInCart($cartList)
    
    function checkIfInCart(items) {
        let boolean = false;
        items.forEach(element => {
            if (element.title == game.title){
                boolean = true
            }
        });
        return boolean
    }

</script>
<div id="wrapper">
    <div id="outer">
    
    <div id="leftVideoBox">
        <p class="titleFont">{game.title}</p>
        <YouTube videoId="ZTCzUrPYYDo" {options}  />
    </div>

    <div id="rightDescriptionBox">
        <img src={game.imgSrc} alt="">
        <h3 class="rightText">{game.description}</h3>
        <h3 class="rightText">Overall ratings: {displayRatings()}</h3>
            <div id="scroll">
                <img class="smallImg" src={img1} alt="avatar">
                <img class="smallImg" src={img2} alt="avatar">
                <img class="smallImg" src={img3} alt="avatar">
                <img class="smallImg" src={img4} alt="avatar">
                <img class="smallImg" src={img5} alt="avatar">
                <img class="smallImg" src={img6} alt="avatar">

            </div>
        <div id="buttonBox">
            {#if !check}
            <button class="button-33" on:click|stopPropagation={() => {handleAddToCart(game)}}>Add to cart</button>
            {/if}
            <button class="button-33" on:click="{() => navigate("/cartList")}">Go to cart</button>
        </div>
    </div>
    </div>
</div>

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




</style>