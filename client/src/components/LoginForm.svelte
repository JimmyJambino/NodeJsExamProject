<script>
    import { isLoggedIn, ownedGames} from "../store/generalStore.js"
    import { fetchOneUser, makeOptions } from "../store/util.js"
    import { navigate } from "svelte-navigator"
    import { toast } from "@zerodevx/svelte-toast";


    let email = "lol@lol.dk"
	let password = "lol123"

    async function handleLogInSubmit() {
        const response = await fetch("/api/login", makeOptions("POST", {email, password}))
        
        if (response.ok){
            const result = await response.json()
            $isLoggedIn = result.isLoggedIn
            const resultGames = result.ownedGames
            //convert objects to be easier to handle
            $ownedGames = resultGames.map( (element) => {
                return {
                    game_id: element.game_id
                }
            })
            console.log("isLogged:", $isLoggedIn, "games", $ownedGames);
            navigate("/", { replace: true })
            toast.push("Logged in", {
                theme: {
                    "--toastBackground": "#48BB78",
                    "--toastBarBackground": "#2F855A",
                },
            })
        } else {
            const result = await response.json()
            switch (result.cause) {
                case "missingDetails":
                    toast.push("Missing details", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                    break;
                case "incorrectLogin":
                    toast.push("Incorrect Login", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                    break;
                default:
                    toast.push("Server Error", {
                        theme: {
                            "--toastBackground": "#F56565",
                            "--toastBarBackground": "#C53030",
                        },
                    })

                    break;
            }
        }
    }
</script>

<div id="loginDiv">
    <form on:submit|preventDefault={handleLogInSubmit}>
        <input
            bind:value={email}
            type="text"
            name="email"
            placeholder="email"
        />
        <br />
        <input
            bind:value={password}
            type="password"
            name="password"
            placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
    </form>
</div>
