import Stripe from 'stripe'
import { Router } from "express"
import { createAccountsGames } from '../database/sqliteDB/crudFunctions/crudAccountsGames.js'
// initialize Stripe  TODO: DOBBELT CHECK
//process.env.STRIPE_SECRET_KEY
const stripe = new Stripe("sk_test_51LBLn5K0jUy4lmxib219v8MRg12NZHUblwlEj7H1deNqydZO8wfwtu7rtUUWcT5cSqXp1PifQ8dELyKoxotOlXVC00GlBVWDFj")

const paymentRouter = Router()

paymentRouter.post("/paymentTest", async (req, res) => {
  const data = await post()
  if (req.session.isLoggedIn) {
    res.send(data)
  } else {
    res.status(403).send({ errMsg: "Not logged in", cause: "notLoggedIn" })
  }
})

// handle POST /create-payment-intent
export async function post() {
  // create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    // note, for some EU-only payment methods it must be EUR
    currency: 'usd',
    // specify what payment methods are allowed
    // can be card, sepa_debit, ideal, etc...
    payment_method_types: ['card'],
  })

  // return the clientSecret to the client
  return {
    body: {
      clientSecret: paymentIntent.client_secret
    }
  }
}

paymentRouter.post("/linkGames", async (req, res) => {
  const gameIds = req.body.gameIds

  gameIds.forEach(gameId => {
    createAccountsGames(req.session.accountId, gameId)
  })
})

export default paymentRouter