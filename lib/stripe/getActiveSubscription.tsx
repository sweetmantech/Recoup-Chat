export const getActiveSubscription = async (accountId: string) => {
  try {
    const response = await fetch(
      `/api/stripe/subscription/search?accountId=${accountId}`,
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
