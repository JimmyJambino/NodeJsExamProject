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
    <h3>Payment failed, try later</h3>
</div>

<style>
h3 {
    color:whitesmoke;
 }
</style>