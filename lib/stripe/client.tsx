const stripeClient = require('stripe')(process.env.STRIPE_SK);

export default stripeClient