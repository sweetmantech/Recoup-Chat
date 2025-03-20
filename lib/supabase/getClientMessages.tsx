/**
 * This function is safe to use in the browser as it uses
 * the public anon key and returns data in the chat interface format
 * 
 * @param chatId The ID of the chat room to fetch messages for
 * @returns Array of messages formatted for the chat UI
 */
const getClientMessages = async (chatId: string) => {
  try {
    const response = await fetch(`/api/memories/get?roomId=${chatId}`);
    const data = await response.json();

    const memories = data?.data || [];

    // Format the messages for the UI
    // eslint-disable-next-line
    return memories.map((memory: any) => ({
      ...memory.content,
    }));
  } catch (error) {
    console.error("[getClientMessages] Error:", error);
    return [];
  }
};

export default getClientMessages; 