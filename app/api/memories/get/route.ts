import { getServerMessages } from "@/lib/supabase/getServerMessages";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get("roomId");

  if (!roomId) {
    return Response.json({ error: "Room ID is required" }, { status: 400 });
  }

  try {
    // Use getServerMessages for consistency
    const messages = await getServerMessages(roomId);
    
    // Transform LangChain messages to client format
    const clientMessages = messages.map(msg => ({
      role: msg._getType() === 'human' ? 'user' : 'assistant',
      content: msg.content,
    }));

    return Response.json({ data: clientMessages }, { status: 200 });
  } catch (error) {
    console.error("[api/memories/get] Error:", error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
