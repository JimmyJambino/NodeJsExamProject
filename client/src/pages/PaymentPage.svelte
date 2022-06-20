<script>
    import { loadStripe } from '@stripe/stripe-js'
    import { PaymentElement } from  'svelte-stripe'
    import { onMount } from 'svelte'
    import {navigate} from "svelte-navigator"
  
    let stripe = null
    let clientSecret = null
    let error = null
    let elements
    let processing = false

    onMount(async () => {
        //PUBLIC KEY
        stripe = await loadStripe("pk_test_51LBLn5K0jUy4lmxiHs9ApCbaM5uLpuZg6U71UvtG4FOdGzUJ4DbE9CTPN54PBtIckXxHh9K8ftc77AzhI8StHnkL00WRL5VGm1")
        // create payment intent server side
        let clientSecretObj = await createPaymentIntent()
        clientSecret = clientSecretObj.body.clientSecret

    })

    async function createPaymentIntent() {
        const response = await fetch('/api/paymentTest', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({amount: 100})
        })

        const clientSecret = await response.json()
    return clientSecret
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return
    processing = true
    // confirm payment with stripe
    const result = await stripe
      .confirmPayment({
        elements,
        redirect: 'if_required'
      })
    // log results, for debugging
    console.log({result})
    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
      navigate("paymentFailed")
    } else {
      // payment succeeded, redirect to "thank you" page
      navigate("thankYouPage")
    }
  }
  </script>


  <div>
    <h1>Payment Element Example</h1>
    <nav>
      <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element">View code</a>
    </nav>

    {#if error}
      <p class=error>{error.message} Please try again.</p>
    {/if}

    {#if stripe && clientSecret}
  <form on:submit|preventDefault={submit}>
    <PaymentElement
      {stripe}
      {clientSecret}
      bind:elements
      theme="flat"
      labels="floating"
      variables={{colorPrimary: '#7c4dff'}}
      rules={{'.Input': { border: 'solid 1px #0002' }}}
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
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 2rem 0;
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