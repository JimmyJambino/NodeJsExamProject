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
    <h3>Thanks for buying our stuff :)</h3>
</div>

<style>
 h3 {
    color:whitesmoke;
 }
</style>