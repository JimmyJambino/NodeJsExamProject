<script>
import { onMount } from 'svelte'
import {navigate} from "svelte-navigator"

onMount( () => {
    setTimeout( () => {
        navigate("/")
    },2000) 
})
</script>

<div>
    <h3>Thanks for giving us your money</h3>
</div>

<style>

</style>