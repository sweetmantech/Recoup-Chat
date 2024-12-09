import handleError from "../handleError";

export const createSession = async (successUrl: string, priceId: string) => {
  try {
    const response = await fetch(
      `/api/stripe/create_checkout_session?successUrl=${encodeURIComponent(successUrl)}&priceId=${priceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    handleError(error);
    return { error };
  }
};
