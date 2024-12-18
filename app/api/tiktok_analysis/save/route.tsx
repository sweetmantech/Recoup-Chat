import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const client = getSupabaseServerAdminClient();
    const { data, error } = await client
      .from("tiktok_analysis")
      .insert({
        ...body,
      })
      .select("*")
      .single();
    console.log("ZIAD ERROR", error);
    if (error)
      return Response.json({ id: null, success: false }, { status: 500 });
    return Response.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ id: null, success: false }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
