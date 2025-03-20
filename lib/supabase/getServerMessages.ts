import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import supabase from "./serverClient";

/**
 * Server-side message fetching function that uses the service role key.
 * ONLY for server-side use with elevated database privileges.
 * 
 * Retrieves messages newest-first for efficiency, then reverses for
 * chronological order to maintain proper conversation context.
 * 
 * @param roomId Chat room ID to fetch messages for
 * @param limit Maximum messages to retrieve (default: 100)
 * @returns LangChain messages in chronological order
 */
export async function getServerMessages(roomId: string, limit = 100): Promise<BaseMessage[]> {
  try {
    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .eq("room_id", roomId)
      .order("updated_at", { ascending: false })
      .limit(limit);
    
    if (error || !data || data.length === 0) {
      return [];
    }
    
    // Convert database records to LangChain message format
    const langChainMessages = data.map((memory) => {
      const content = memory.content;
      
      if (content.role === "user") {
        return new HumanMessage(content.content);
      } else if (content.role === "assistant") {
        return new AIMessage(content.content);
      }
      
      return new HumanMessage(content.content);
    });
    
    // Reverse to get chronological order (oldest first) for proper conversation context
    return langChainMessages.reverse();
  } catch {
    return [];
  }
} 