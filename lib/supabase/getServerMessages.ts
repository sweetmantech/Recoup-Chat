import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import supabase from "./serverClient";

/**
 * Server-side message fetching function that uses the service role key
 * This function should ONLY be used server-side as it has elevated privileges
 * and returns data in LangChain format for AI processing
 * 
 * @param roomId The ID of the chat room to fetch messages for
 * @param limit Maximum number of messages to retrieve (default: 100)
 * @returns Array of LangChain messages in chronological order
 */
export async function getServerMessages(roomId: string, limit = 100): Promise<BaseMessage[]> {
  try {
    // Fetch most recent messages first (for efficiency), then reverse
    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .eq("room_id", roomId)
      .order("updated_at", { ascending: false })
      .limit(limit);
    
    if (error || !data || data.length === 0) {
      return [];
    }
    
    // Convert to LangChain message format
    const langChainMessages = data.map((memory) => {
      const content = memory.content;
      
      if (content.role === "user") {
        return new HumanMessage(content.content);
      } else if (content.role === "assistant") {
        return new AIMessage(content.content);
      }
      
      return new HumanMessage(content.content);
    });
    
    // Reverse to get chronological order (earliest first)
    return langChainMessages.reverse();
  } catch (error) {
    console.error("[getServerMessages] Error:", error);
    return [];
  }
} 