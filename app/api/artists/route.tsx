import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  try {
    const client = getSupabaseServerAdminClient();
    const { data: accountEmail } = await client
      .from("account_emails")
      .select("*")
      .eq("email", email)
      .single();
    const accountId = accountEmail.account_id;
    const { data: account_artist_ids } = await client
      .from("account_artist_ids")
      .select("artist_id")
      .eq("account_id", accountId);
    const artistIds = account_artist_ids?.map((ele) => ele.artist_id) || [];
    const { data: artists } = await client
      .from("accounts")
      .select("*, account_info(*), artist_account_socials:account_socials(*)")
      .in("id", artistIds);

    return Response.json({ data: artists }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
