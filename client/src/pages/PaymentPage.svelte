<script>
  import { loadStripe } from "@stripe/stripe-js";
  import { PaymentElement } from "svelte-stripe";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { cartList, cartTotal, ownedGames } from "../store/generalStore";
  import { makeOptions } from "../store/util";

  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;

  onMount(async () => {
    //PUBLIC KEY
    stripe = await loadStripe(
      "pk_test_51LBLn5K0jUy4lmxiHs9ApCbaM5uLpuZg6U71UvtG4FOdGzUJ4DbE9CTPN54PBtIckXxHh9K8ftc77AzhI8StHnkL00WRL5VGm1"
    );
    // create payment intent server side
    let clientSecretObj = await createPaymentIntent();
    //if (clientSecretObj?.data != null) {
    clientSecret = clientSecretObj.body.clientSecret;
    //} else
  });

  async function createPaymentIntent() {
    const response = await fetch("/api/paymentTest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ amount: $cartTotal }),
    });

    const clientSecret = await response.json();
    return clientSecret;
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return;
    processing = true;
    // confirm payment with stripe
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // payment failed, notify user
      error = result.error;
      processing = false;
      navigate("paymentFailed");
    } else {
      // payment succeeded, redirect to "thank you" page
      // find the games that were bought and add them to the accounts games table
      const games = $cartList.filter((item) => {
        if (item.type != "clothing") {
          return item.id;
        }
      });

      if (games) {
        fetch("/api/linkGames", makeOptions("POST", { games: games }));

        $ownedGames = [
          ...$ownedGames,
          ...games.map((game) => {
            return {
              game_id: game.id,
            };
          }),
        ];
      }

      $cartList = [];

      navigate("thankYouPage");
    }
  }
</script>

<div id="payment-container">
  {#if error}
    <p class="error">{error.message} Please try again.</p>
  {/if}

  {#if stripe && clientSecret}
    <form on:submit|preventDefault={submit}>
      <PaymentElement
        {stripe}
        {clientSecret}
        bind:elements
        theme="flat"
        labels="floating"
        variables={{ colorPrimary: "#7c4dff" }}
        rules={{ ".Input": { border: "solid 1px #0002" } }}
      />
      <button disabled={processing}>
        {#if processing}
          Processing...
        {:else}
          Pay
        {/if}
      </button>
    </form>
  {:else}
    Loading...
  {/if}
</div>

<style>
  .error {
    color: tomato;
    margin: 2rem 0 0;
  }

  #payment-container {
    display: flex;
    max-width: 50vw;
    justify-content: center;
    margin: auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  button {
    padding: 1rem;
    border-radius: 5px;
    border: solid 1px #ccc;
    color: rgb(35, 185, 35);
    background: var(--link-color);
    font-size: 1.2rem;
    margin: 1rem 0;
  }
</style>
