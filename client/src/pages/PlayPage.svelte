<script>
    import { navigate } from "svelte-navigator"
    import {makeOptions} from "../store/util.js"
    import { toast } from "@zerodevx/svelte-toast";
    import { playerName } from '../store/gameControllerStore'
    export let socket

    function handleJoinSubmit() {
        playerName.set(name)
        
        if(roomKey.length === 4 && $playerName.length !== 0) {
            const givenInfo = {roomKey, name: $playerName, score: 0}

            socket.emit("room:playerJoined", (givenInfo))
            navigate("player", {})
        } else if(roomKey.length === 4 && $playerName.length === 0){
            toast.push("Player name can't be empty.", {
                theme: {
                  '--toastBackground': '#F56565',
                  '--toastBarBackground': '#C53030'
                }
            })
        } else if(roomKey.length !== 4 && $playerName.length !== 0) {
            toast.push("Room key must be 4 characters", {
                theme: {
                  '--toastBackground': '#F56565',
                  '--toastBarBackground': '#C53030'
                }
            })
        } else {
            toast.push("Room key must be 4 characters, and the player name can't be empty.", {
                theme: {
                  '--toastBackground': '#F56565',
                  '--toastBarBackground': '#C53030'
                }
            })
        }
    }

    async function handleHostSubmit() {
        console.log("HOST SUBMIT YEY");
        const FIBORDIBID = 1
        const response = await fetch("/api/checkGameOwnership", makeOptions("POST", {game_id: FIBORDIBID}))
        if (response.ok) {
            navigate("room", {replace:true})
        }

        
    }

    let roomKey = ""
    let name = ""
</script>

<div id="outmostDiv">
<div id="outerDiv">
    <!--Player section-->
    <div id="playerDiv">
        <h3>Join game as a player</h3>
        <input
            bind:value={name}
            type="text"
            name="playerName"
            placeholder="Enter your player name"
        />
        <input
            bind:value={roomKey}
            type="text"
            name="roomKey"
            placeholder="Enter room key"
        />
        <button id="enterRoom" class="button-71" on:click|preventDefault={handleJoinSubmit}>Enter room</button>
    </div>

    <!--Divider-->
    <hr class="solid">

    <!-- Host section-->
    <div id="hostDiv">
        <h3>Start game as a host</h3>
        <button class="button-71" on:click|preventDefault={handleHostSubmit}>Start new game</button><!-- select game from here in the future  -->
    </div>
   
</div>
</div>


<style>
    #outmostDiv{
        display: flex;
        justify-content: center;
    }
    #outerDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        color: white;
    }
    #playerDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #enterRoom {
        width: 70%;
    }
    hr.solid {
  border-top: 3px solid #bbb;
  width: 100%;
}
.button-71 {
  background-color: #0078d0;
  border: 0;
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 72px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-71:before {
  background-color: initial;
  background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
  border-radius: 125px;
  content: "";
  height: 50%;
  left: 4%;
  opacity: .5;
  position: absolute;
  top: 0;
  transition: all .3s;
  width: 92%;
}

.button-71:hover {
  box-shadow: rgba(167, 12, 144, 0.925) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .button-71 {
    padding: 16px 48px;
  }
}
</style>


