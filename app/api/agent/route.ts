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
            *
          )
        )
      `,
      )
      .eq("id", agentId)
      .single();
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
