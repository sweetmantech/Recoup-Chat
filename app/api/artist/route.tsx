import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const artistId = req.nextUrl.searchParams.get("artistId");

  try {
    const client = getSupabaseServerAdminClient();
    const { data: account_info } = await client
      .from("account_info")
      .select("image, instruction, knowledges, label, organization, account_id")
      .eq("account_id", artistId)
      .single();
    const { data: artist_account_socials } = await client
      .from("account_socials")
      .select("*")
      .eq("account_id", artistId);
    if (!account_info) throw new Error("failed");

    return Response.json(
      {
        artist: {
          ...account_info,
          artist_account_socials: artist_account_socials || [],
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
