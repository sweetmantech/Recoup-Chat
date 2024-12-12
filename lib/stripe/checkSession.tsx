export const checkSession = async (sessionId: string, accountId: string) => {
  try {
    const response = await fetch(
      `/api/stripe/session/checked?sessionId=${sessionId}&accountId=${accountId}`,
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
