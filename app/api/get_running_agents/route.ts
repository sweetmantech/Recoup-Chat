import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { STEP_OF_ANALYSIS } from "@/types/Funnel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const artistId = req.nextUrl.searchParams.get("artistId");
  try {
    const client = getSupabaseServerAdminClient();
    const { data } = await client
      .from("funnel_analytics")
      .select("*")
      .neq("status", STEP_OF_ANALYSIS.FINISHED)
      .neq("status", STEP_OF_ANALYSIS.WRAPPED_COMPLETED)
      .eq("artistId", artistId as string);

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
