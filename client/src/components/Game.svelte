<script>
    export let id
    export let name
    export let price = 69
    export let description = "a game"
    //export let navigate
    
    import { useNavigate } from "svelte-navigator";
    const navigate = useNavigate()

    function handleSubmit() {
    navigate("/store/"+ id,true)
}

</script>

<div id="inner">
    <h4>{name}</h4>
    <p>Price:{price}</p>
    <p>id: {id}</p>
    <p>{description}</p>
    <button class="btn btn-success"on:click|preventDefault={handleSubmit}>Inspect</button>
</div>







<style>
    #inner {
        background-color: aquamarine;
        display:block;
        width: 26%;
        height: 26%;
        margin: 0.1em;
        float: left;
        text-align: center;
        

    }
</style>