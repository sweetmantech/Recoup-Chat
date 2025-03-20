import { getServerMessages } from "@/lib/supabase/getServerMessages";
import { NextRequest } from "next/server";

/**
 * API endpoint to retrieve chat messages for a specific room.
 * Transforms LangChain format to client UI format.
 */
export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get("roomId");

  if (!roomId) {
    return Response.json({ error: "Room ID is required" }, { status: 400 });
  }

  try {
    // Retrieve messages using the server function for consistency
    const messages = await getServerMessages(roomId);
    
    // Transform messages from LangChain format to client format
    const clientMessages = messages.map(msg => ({
      role: msg._getType() === 'human' ? 'user' : 'assistant',
      content: msg.content,
    }));

    return Response.json({ data: clientMessages }, { status: 200 });
  } catch {
    return Response.json({ message: "Failed to retrieve messages" }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
