const decreaseCredits = async (accountId: string, credits: number) => {
  try {
    const response = await fetch(
      `/api/credits/decrease?accountId=${accountId}&credits=${credits}`,
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default decreaseCredits;
