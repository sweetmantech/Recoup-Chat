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
    const { data: artist_account_infos } = await client
      .from("account_info")
      .select("*, accounts(name)")
      .in("account_id", artistIds);
    console.log("ZIAD", artist_account_infos);
    const artistsPromise = artist_account_infos?.map(
      async (artist_account_info) => {
        const { data: artist_account_socials } = await client
          .from("account_socials")
          .select("*")
          .eq("account_id", artist_account_info.account_id);
        artist_account_info.name = artist_account_info.accounts.name;
        delete artist_account_info.accounts;
        return {
          ...artist_account_info,
          artist_account_socials,
        };
      },
    );

    // eslint-disable-next-line
    let artists: any = [];
    if (artistsPromise) artists = await Promise.all(artistsPromise);

    return Response.json({ artists }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
