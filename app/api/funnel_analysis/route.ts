import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get("chatId");

  try {
    const client = getSupabaseServerAdminClient();
    const { data } = await client
      .from("funnel_analytics")
      .select(
        `*,
        funnel_analytics_segments (
          *
        ),
        funnel_analytics_profile (
          *,
          artists (
            *,
            artist_social_links (
              *
            )
          )
        )`,
      )
      .eq("chat_id", chatId);

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
