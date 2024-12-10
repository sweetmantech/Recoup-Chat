export const createSession = async (
  successUrl: string,
  priceId: string,
  referenceId: string,
  chatId: string,
) => {
  try {
    const response = await fetch(
      `/api/stripe/session/create?successUrl=${encodeURIComponent(successUrl)}&priceId=${priceId}&referenceId=${referenceId}&chatId=${chatId}`,
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
    return { error };
  }
};
