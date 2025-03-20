import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import supabase from "./serverClient";

// Shared query function for database access
export async function queryMemories(roomId: string, options?: { 
  ascending?: boolean;
  limit?: number;
}) {
  const ascending = options?.ascending ?? false;
  const limit = options?.limit;
  
  let query = supabase
    .from("memories")
    .select("*")
    .eq("room_id", roomId)
    .order("updated_at", { ascending });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  return query;
}

export async function getServerMessages(roomId: string, limit = 100): Promise<BaseMessage[]> {
  try {
    const { data, error } = await queryMemories(roomId, { ascending: false, limit });
    
    if (error || !data || data.length === 0) {
      return [];
    }
    
    
    const langChainMessages = data.map((memory) => {
      const content = memory.content;
      
      if (content.role === "user") {
        return new HumanMessage(content.content);
      } else if (content.role === "assistant") {
        return new AIMessage(content.content);
      }
      
      return new HumanMessage(content.content);
    });
    
    
    return langChainMessages.reverse();
  } catch {
    return [];
  }
} 