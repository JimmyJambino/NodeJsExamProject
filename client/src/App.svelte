<script>
	import {io} from "socket.io-client"
	const socket = io("localhost:3000")
	socket.on("connect", () => {
		socket.emit("test", {data: socket.id})
	})
	
</script>

<main>
	<p>This is a test</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>