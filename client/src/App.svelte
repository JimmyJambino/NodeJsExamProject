<script>
	import { Router, Link, Route } from "svelte-navigator"
	import FrontPage from "./pages/FrontPage.svelte"
	import About from "./pages/About.svelte"
	import Store from "./pages/Store.svelte"
	import Profile from "./pages/Profile.svelte"
	import Banner from "./components/Banner.svelte"
	import PrivateRoute from "./pages/PrivateRoute.svelte"

	import {currentUser} from "./store/generalStore.js"

	import {io} from "socket.io-client"
	const socket = io("localhost:3000")
	socket.on("connect", () => {
		socket.emit("test", {data: socket.id})
	})
	
	let email = "lol@lol.dk"
	let password = ""
	

	function handleSubmit() {
		$currentUser = "ikke null"
		const givenInfo = {email, password}
	}

</script>

<main>
	<Banner/>
	<Router>
	<div id="headerDiv">
		<div id="navDiv">
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="about">About</Link></li>
				<li><Link to="store">Store</Link></li>
				{#if $currentUser != null}
				<li><Link to="profile">Profile</Link></li>
				{/if}
				{#if $currentUser == null}
				<li><Link to="login">Register</Link></li>
				{/if}
			</ul>
		</nav>
		</div>
			<div id="loginDiv">
				<form on:submit|preventDefault={handleSubmit}>
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
	</div>


		<div>
		<Route path="/">
			<FrontPage/>
		</Route>
		<Route path="about">
			<About/>
		</Route>
		<Route path="store">
			<Store/>
		</Route>
		<PrivateRoute path="profile">
			<Profile/>
		</PrivateRoute>
		</div>
	</Router>
</main>

<footer>
	{new Date().getFullYear()}
	Contact
	Other
	FAQ
</footer>

<style>
main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		min-height: calc(100vh - 4em); 
	} 
#headerDiv {
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: aqua;
}
#navDiv {
	display: flex;
	justify-content: center;
    background-color: lightgreen;
    flex-direction: row;
	width: 75%;
	}
	
ul {
		
		list-style: none;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
li{
	font-size: xx-large;
		margin: 30px
	}
#loginDiv {
	background-color: red;
		float: right;
		width: 20%;

	}
footer {
		background-color: grey;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>