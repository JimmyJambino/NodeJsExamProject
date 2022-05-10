<script>
import { useNavigate } from "svelte-navigator";

    import { currentUser } from "../store/generalStore";
    
    const navigate = useNavigate()

    function handleLogOut() {
        $currentUser = null
        navigate("/", {replace: true})
    }
</script>

<div>
    <h3>Profile</h3>
    <button on:click|preventDefault={handleLogOut}>Log out</button>
</div>

<style>
    
</style>