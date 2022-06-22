<script>
    export let header;

    //please work dispatch, I really dont get you
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function sortTableByHeader(event) {
        const target = event.target.id
		dispatch('myOwnEvent', {
			header: target
		});
	}

    function capitalizeFirstLetter(string) {
        let str1 = string.slice(0,1).toUpperCase()
        let strRest = string.slice(1,string.length)
        const together = str1+strRest
        return together
    }

</script>


{#each header as head}
    <th on:click={sortTableByHeader} id={head}>{capitalizeFirstLetter(head.toString())}</th>
{/each}
    <th>Options</th>

<style>
    th {
        background-color:rgba(232, 32, 2, 0.2);
        cursor: pointer;
        border: 1px solid #dddddd;
        text-align: center;
        display: table-cell;
        height: 2rem;
        width: 10rem;
        color: white;
    }
    
</style>