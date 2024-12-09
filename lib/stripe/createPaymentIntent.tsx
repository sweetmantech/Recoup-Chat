import qs from "qs"
import handleError from "../handleError"

export const createPaymentIntent = async (
) => {
  try {
    const data = {
      amount: 99,
      currency: "usd",
      application_fee_amount: 0,
      "automatic_payment_methods[enabled]": "true",
      "transfer_data[destination]": "acct_1P0selF15SheFPGX",
      "metadata[created_at]": Date.now(),
    }

    const dataStringify = qs.stringify(data)

    const response = await fetch(`https://api.stripe.com/v1/payment_intents`, {
      method: "post",
      data: "",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SK}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const data = await response.json();
    return data
  } catch (err) {
    handleError(err)
    return { error: err }
  }
}
