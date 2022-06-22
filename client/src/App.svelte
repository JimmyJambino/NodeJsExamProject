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
	import Register from "./pages/Register.svelte"
	import RoomPage from "./pages/RoomPage.svelte"
	import DisplayGame from "./pages/DisplayGame.svelte"
	import CartOverview from "./pages/CartOverview.svelte"
	import PlayerPage from "./pages/PlayerPage.svelte"
	import HostFibOrDibPage from "./pages/HostFibOrDibPage.svelte"
	import PaymentPage from "./pages/PaymentPage.svelte"
	import ThankYouPage from "./pages/ThankYouPage.svelte"
	import PaymentFailed from "./pages/PaymentFailed.svelte"
	import {onMount} from "svelte"
	import {fetchOneUser} from "./store/util.js"
	import {io} from "socket.io-client"
import TestPage from "./pages/TestPage.svelte";

	//function to get an individual socket
	const socket = io("http://localhost:3000")
/*
	const getSocket =  () => {
		const clientSocket = io("http://localhost:3000")
		socket.set(clientSocket)
		console.log("lol",socket);
		console.log($socket);
	}

	onMount( async () => {
		await getSocket()
		console.log("onMount");
		console.log($socket.connected);
		console.log($socket.id);
		console.log($socket);
	})
*/

	
	socket.on("connect", () => {
		socket.emit("test", {data: socket.id})
	})
	
	let email = "lol@lol.dk"
	let password = "lol123"

	async function handleLogInSubmit() {
		const givenInfo = {email, password}
		const fetchedUserData = await fetchOneUser(givenInfo)
		console.log("user:", fetchedUserData);
		$currentUser = {data: "ikke null"} //TODO: FIKS LOL

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
		<!-- <Banner/> -->
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
				<li><Link to="cartList">Cart</Link></li>
				<li><Link to="test">test</Link></li>
				
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
		<Route path="store/*"  primary={false}>
			<Route path="/">
				<Store/>
			</Route>
			<Route path=":id" let:params>
				<DisplayGame id={params.id}/>
			</Route>
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
			<PlayPage socket={socket}/>
		</Route>
		<Route path="room" primary={false}>
			<RoomPage socket={socket}/>
		</Route>
		<Route path="cartList" >
			<CartOverview/>
		</Route>
		<Route path="paymentPage" >
			<PaymentPage navigate=navigate/>
		</Route>
		<Route path="thankYouPage">
			<ThankYouPage/>
		</Route>
		<Route path="paymentFailed">
			<PaymentFailed/>
		</Route>
		<Route path="player">
			<PlayerPage socket={socket}/>
		</Route>
		<Route path="FibOrDib">
			<HostFibOrDibPage socket={socket}/>
		</Route>
		<Route path="test">
			<TestPage/>
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

	body{ margin: 0 }

	main {

	background: rgb(0,38,54);
	background: linear-gradient(90deg, rgba(0,38,54,1) 0%, rgba(3,61,85,1) 50%, rgba(0,38,54,1) 100%);
	text-align: center;
	max-width: 240px;
	width: 100%;
	min-height: calc(100vh - 2rem);
} 
#headerDiv {
	width: 100%;
	display: flex;
	justify-content: center;
    background-color: #002636;
	height: 15vh;
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
		margin: 1em 2rem;
	}
#loginDiv {
		float: right;
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1em;

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