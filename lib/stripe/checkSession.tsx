export const checkSession = async (referenceId: string, chatId: string) => {
  try {
    const response = await fetch(
      `/api/stripe/session/checked?referenceId=${referenceId}&chatId=${chatId}`,
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
