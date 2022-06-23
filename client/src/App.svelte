<script>
	import {
		Router,
		Link,
		Route,
		navigate,
		useNavigate,
	} from "svelte-navigator";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { onMount } from "svelte";
	import { io } from "socket.io-client";

	import Banner from "./components/Banner.svelte";
	import LoginForm from "./components/LoginForm.svelte";

	import FrontPage from "./pages/FrontPage.svelte";
	import About from "./pages/About.svelte";
	import Store from "./pages/StorePage.svelte";
	import Profile from "./pages/Profile.svelte";
	import MerchStorePage from "./pages/MerchStorePage.svelte";
	import PrivateRoute from "./pages/PrivateRoute.svelte";
	import PlayPage from "./pages/PlayPage.svelte";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import RoomPage from "./pages/RoomPage.svelte";
	import DisplayGame from "./pages/DisplayGame.svelte";
	import CartOverview from "./pages/CartOverview.svelte";
	import PlayerPage from "./pages/PlayerPage.svelte";
	import HostFibOrDibPage from "./pages/HostFibOrDibPage.svelte";
	import PaymentPage from "./pages/PaymentPage.svelte";
	import ThankYouPage from "./pages/ThankYouPage.svelte";
	import PaymentFailed from "./pages/PaymentFailed.svelte";
	import TestPage from "./pages/TestPage.svelte";

	import { isLoggedIn, playTime } from "./store/generalStore.js";

	//function to get an individual socket
	const socket = io("http://localhost:3000");

	function handleBackButton() {
		$playTime = false;
		navigate("/", { replace: true });
	}

	$: cart = $cartList.length;
	function cartSize(cart) {
		if (cart > 0) {
			return "(" + cart + ")";
		} else {
			return "";
		}
	}
</script>

<main>
	<SvelteToast />
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
							{#if $isLoggedIn != null}
								<li><Link to="profile">Profile</Link></li>
							{/if}
							{#if $isLoggedIn == null}
								<li><Link to="register">Register</Link></li>
							{/if}
							<li><Link to="cartList">Cart</Link></li>
							<li><Link to="test">test</Link></li>
						</ul>
					</nav>
				</div>
				{#if !$isLoggedIn}
					<LoginForm />
				{/if}
			</div>
		{/if}

		{#if $playTime == true}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img
				id="back-btn"
				src="images/backbutton.png"
				on:click|preventDefault={handleBackButton}
			/>
		{/if}

		<Route path="/" primary={false}>
			<FrontPage />
		</Route>

		<Route path="store/*" primary={false}>
			<Route path="/">
				<Store />
			</Route>
			<Route path=":id" let:params>
				<DisplayGame id={params.id} />
			</Route>
		</Route>

		<Route path="merch/*">
			<Route path="/">
				<MerchStorePage />
			</Route>
			<Route path=":id" let:params>
				<DisplayMerchPage id={params.id} />
			</Route>
		</Route>

		<PrivateRoute path="profile">
			<Profile />
		</PrivateRoute>
		<Route path="register">
			<RegisterPage />
		</Route>
		<Route path="play">
			<PlayPage {socket} />
		</Route>
		<Route path="room" primary={false}>
			<RoomPage {socket} />
		</Route>
		<Route path="cartList">
			<CartOverview />
		</Route>
		<Route path="paymentPage">
			<PaymentPage navigate="navigate" />
		</Route>
		<Route path="thankYouPage">
			<ThankYouPage />
		</Route>
		<Route path="paymentFailed">
			<PaymentFailed />
		</Route>
		<Route path="player">
			<PlayerPage {socket} />
		</Route>
		<Route path="FibOrDib">
			<HostFibOrDibPage {socket} />
		</Route>
		<Route path="test">
			<TestPage />
		</Route>
	</Router>
</main>

<footer>
	{new Date().getFullYear()}
	Contact Other FAQ
</footer>

<style>
	#back-btn {
		float: left;
		z-index: -1;
	}

	body {
		margin: 0;
	}

	main {
		background: rgb(0, 38, 54);
		background: linear-gradient(
			90deg,
			rgba(0, 38, 54, 1) 0%,
			rgba(3, 61, 85, 1) 50%,
			rgba(0, 38, 54, 1) 100%
		);
		text-align: center;
		/* max-width: 240px; */
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
	li {
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
		position: absolute;
		right: 3rem;
	}

	/* CSS */
	.button-8 {
		background-color: #e1ecf4;
		border-radius: 3px;
		border: 1px solid #7aa7c7;
		box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
		box-sizing: border-box;
		color: #39739d;
		cursor: pointer;
		display: inline-block;
		font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
			sans-serif;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.15385;
		margin: 0;
		outline: none;
		padding: 8px 0.8em;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: baseline;
		white-space: nowrap;
		height: 2rem;
	}

	.button-8:hover,
	.button-8:focus {
		background-color: #b3d3ea;
		color: #2c5777;
	}

	.button-8:focus {
		box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
	}

	.button-8:active {
		background-color: #a0c7e4;
		box-shadow: none;
		color: #2c5777;
	}

	footer {
		background-color: grey;
		min-height: 32px;
	}
</style>
