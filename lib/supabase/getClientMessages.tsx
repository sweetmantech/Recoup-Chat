/**
 * Fetches chat messages for UI display.
 * Safe for browser use - calls server API endpoint with public permissions.
 * 
 * @param chatId Chat room ID to fetch messages for
 * @returns Messages formatted for the chat UI
 */
const getClientMessages = async (chatId: string) => {
  try {
    const response = await fetch(`/api/memories/get?roomId=${chatId}`);
    const data = await response.json();

    const memories = data?.data || [];

    // Format messages for UI consumption
    return memories.map((memory: { content: { role: string; content: string } }) => ({
      ...memory.content,
    }));
  } catch {
    return [];
  }
};

export default getClientMessages; 