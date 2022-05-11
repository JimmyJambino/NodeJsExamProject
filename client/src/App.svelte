<script>
	import { Router, Link, Route, navigate, useNavigate } from "svelte-navigator"
	import FrontPage from "./pages/FrontPage.svelte"
	import About from "./pages/About.svelte"
	import Store from "./pages/Store.svelte"
	import Profile from "./pages/Profile.svelte"
	import MerchStorePage from "./pages/MerchStorePage.svelte"
	import Banner from "./components/Banner.svelte"
	import PrivateRoute from "./pages/PrivateRoute.svelte"
	import PlayPage from "./pages/PlayPage.svelte"
	import {currentUser, playTime} from "./store/generalStore.js"
	import Register from "./pages/Register.svelte";


	import {io} from "socket.io-client"
	//function to get an individual socket
	const socket = io("http://localhost:3000")
	
	socket.on("connect", () => {
		socket.emit("test", {data: socket.id})
	})
	
	let email = "lol@lol.dk"
	let password = ""

	function handleLogInSubmit() {
		$currentUser = "ikke null"
		const givenInfo = {email, password}
		navigate("/", {replace: true})
	}

	function handleBackButton() {
		$playTime = false;
		navigate("/", {replace:true})
	}

</script>

<main>
	<Router>
		<!-- Navbar and Banner for the webpage-->
		{#if $playTime == false}
		<Banner/>
		<div id="headerDiv">
		<div id="navDiv">
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="about">About</Link></li>
				<li><Link to="store">Store</Link></li>
				<li><Link to="merch">Merch</Link></li>
				{#if $currentUser != null}
				<li><Link to="profile">Profile</Link></li>
				{/if}
				{#if $currentUser == null}
				<li><Link to="register">Register</Link></li>
				{/if}
				
			</ul>
		</nav>
		</div>
			<div id="loginDiv">
				<form on:submit|preventDefault={handleLogInSubmit}>
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
	{/if}

	{#if $playTime == true}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img id="back-btn" src="images/backbutton.png" on:click|preventDefault={handleBackButton}>
	{/if}
		
		<Route path="/" primary={false}>
			<FrontPage/>
		</Route>
		<Route path="about">
			<About/>
		</Route>
		<Route path="store">
			<Store/>
		</Route>
		<Route>
			<MerchStorePage/>
		</Route>
		<PrivateRoute path="profile">
			<Profile/>
		</PrivateRoute>
		<Route path="register">
			<Register/>
		</Route>
		<Route path="play">
			<PlayPage/>
		</Route>
	</Router>
</main>

<footer>
	{new Date().getFullYear()}
	Contact
	Other
	FAQ
</footer>

<style>
	#back-btn {
		float: left;
		z-index: -1;
	}
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

    background-color: rgba(112,146,190,255);
}
#navDiv {
	display: flex;
	justify-content: center;
   
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