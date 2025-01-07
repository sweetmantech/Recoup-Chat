export const createSession = async (
  successUrl: string,
  productName: string,
  referenceId: string,
  isSubscription: boolean,
  totalPrice: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any,
) => {
  try {
    const response = await fetch(`/api/stripe/session/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        successUrl,
        productName,
        referenceId,
        isSubscription,
        metadata,
        totalPrice,
      }),
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
