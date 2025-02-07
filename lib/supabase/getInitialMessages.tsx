const getInitialMessages = async (chatId: string) => {
  try {
    const response = await fetch(`/api/memories/get?roomId=${chatId}`);
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getInitialMessages;
