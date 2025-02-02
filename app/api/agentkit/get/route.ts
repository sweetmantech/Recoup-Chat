import { AGENT_API } from "@/lib/consts";
import getPostComments from "@/lib/getPostComments";
import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId");
  try {
    const client = getSupabaseServerAdminClient();
    const { data } = await client
      .from("agents")
      .select(
        `
        *,
        agent_status (
          *,
          social:socials (
            *,
            social_posts (
              *,
              posts (
                *
              )
            ),
            social_spotify_tracks (
              *,
              spotify_tracks (
                *
              )
            ),
            social_spotify_albums (
              *,
              spotify_albums (
                *
              )
            )
          )
        )
      `,
      )
      .eq("id", agentId)
      .single();
    const comments = await getPostComments(data.agent_status);
    return NextResponse.json({
      data,
      comments,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
