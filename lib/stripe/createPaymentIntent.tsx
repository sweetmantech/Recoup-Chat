import handleError from "../handleError";

export const createPaymentIntent = async () => {
  try {
    const response = await fetch(`/api/stripe/create_payment_intent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    handleError(error);
    return { error };
  }
};
