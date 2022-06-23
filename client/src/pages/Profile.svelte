<script>
import { useNavigate } from "svelte-navigator";

    import { isLoggedIn } from "../store/generalStore";
    
    const navigate = useNavigate()

    function handleLogOut() {
        $isLoggedIn = null
        navigate("/", {replace: true})
    }
</script>

<div>
    <h3>Profile</h3>
    <button on:click|preventDefault={handleLogOut}>Log out</button>
</div>

<style>
    
</style>