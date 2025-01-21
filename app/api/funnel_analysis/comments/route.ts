import getFunnelAnalyticsComments from "@/lib/supabase/getFunnelAnalyticsComments";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const chatIds = body.chatIds;

  try {
    const data = await getFunnelAnalyticsComments(chatIds);
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
