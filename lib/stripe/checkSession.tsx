export const checkSession = async (sessionId: string, chatId: string) => {
  try {
    const response = await fetch(
      `/api/stripe/session/checked?sessionId=${sessionId}&chatId=${chatId}`,
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
