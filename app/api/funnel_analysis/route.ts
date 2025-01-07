import getFunnelAnalysis from "@/lib/chat/getFunnelAnalysis";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  try {
    const data = await getFunnelAnalysis(chatId as string);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
