import handleError from "../handleError";

export const createPaymentIntent = async () => {
  try {
    const paymentIntentData = {
      amount: 99,
      currency: "usd",
      "automatic_payment_methods[enabled]": "true",
      "metadata[created_at]": Date.now(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const response = await fetch(`https://api.stripe.com/v1/payment_intents`, {
      method: "POST",
      body: new URLSearchParams(paymentIntentData).toString(),
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SK}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return { error };
  }
};
