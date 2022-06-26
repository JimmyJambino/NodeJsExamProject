<script>
	import {
		Router,
		Link,
		Route,
		navigate,
	} from "svelte-navigator";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { io } from "socket.io-client";

	import Banner from "./components/Banner.svelte";
	import LoginForm from "./components/LoginForm.svelte";
	import FrontPage from "./pages/FrontPage.svelte";
	import Store from "./pages/StorePage.svelte";
	import Profile from "./pages/Profile.svelte";
	import MerchStorePage from "./pages/MerchStorePage.svelte";
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import PlayPage from "./pages/PlayPage.svelte";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import RoomPage from "./pages/RoomPage.svelte";
	import DisplayGame from "./pages/DisplayGame.svelte";
	import CartOverview from "./pages/CartOverview.svelte";
	import PlayerPage from "./pages/PlayerPage.svelte";
	import PaymentPage from "./pages/PaymentPage.svelte";
	import ThankYouPage from "./pages/ThankYouPage.svelte";
	import PaymentFailed from "./pages/PaymentFailed.svelte";
	import DisplayMerchPage from "./pages/DisplayMerchPage.svelte";

	import { isLoggedIn, playTime, cartList } from "./store/generalStore.js";
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
			<div id="headerDiv">
				<div id="navDiv">
					<nav>
						<ul>
							<li id="bannerL"><Link to="/"><Banner /></Link></li>
							<li><Link to="/">Home</Link></li>
							<li><Link to="store">Store</Link></li>
							<li><Link to="merch">Merch</Link></li>
							{#if $isLoggedIn}
								<li><Link to="profile">Profile</Link></li>
							
							{:else}
								<li><Link to="register">Register</Link></li>
							{/if}
							<li><Link to="cartList">Cart {cartSize(cart)}</Link></li>
						</ul>
					</nav>
				</div>
				{#if !$isLoggedIn}
				<LoginForm/>
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
	</Router>
</main>

<footer>
	{new Date().getFullYear()}
	Contact Other FAQ
</footer>

<style>
	#bannerL {
		margin: 0;
		align-self: center;
	}
	#back-btn {
		float: left;
		z-index: -1;
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
		padding: 0;
		list-style: none;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
	li {
		font-size: xx-large;
		margin: 1em 2rem;
	}


	footer {
		background-color: grey;
		min-height: 32px;
	}
</style>
