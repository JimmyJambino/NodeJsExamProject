<script>
import { useNavigate } from "svelte-navigator";

    import { isLoggedIn,ownedGames,currentUser } from "../store/generalStore";
import { makeOptions } from "../store/util";
    
    const navigate = useNavigate()

    async function handleLogOut() {
        $isLoggedIn = false
        $ownedGames = []
        $currentUser = null
        await fetch("/api/logout", makeOptions("POST",{}))
        navigate("/", {replace: true})
    }
</script>

<div>
    <h3>Profile</h3>
    <button on:click|preventDefault={handleLogOut}>Log out</button>
</div>

<style>
    
</style>