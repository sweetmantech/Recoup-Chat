import updateArtistProfile from "@/lib/supabase/updateArtistProfile";
import updateArtistSocials from "@/lib/supabase/updateArtistSocials";
import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const image = body.image;
  const name = body.name;
  const artistId = body.artistId;
  const email = body.email;
  const tiktok_url = body.tiktok_url;
  const youtube_url = body.youtube_url;
  const apple_url = body.apple_url;
  const instagram_url = body.instagram_url;
  const twitter_url = body.twitter_url;
  const spotify_url = body.spotify_url;
  const label = body.label;
  const instruction = body.instruction;
  const knowledges = body.knowledges;

  try {
    const client = getSupabaseServerAdminClient();
    const artistAccountId = await updateArtistProfile(
      artistId,
      email,
      image,
      name,
      instruction,
      label,
      knowledges,
    );

    await updateArtistSocials(
      artistAccountId,
      tiktok_url,
      youtube_url,
      apple_url,
      instagram_url,
      twitter_url,
      spotify_url,
    );

    const { data: account_info } = await client
      .from("account_info")
      .select("image, instruction, knowledges, label, organization, account_id")
      .eq("account_id", artistAccountId)
      .single();
    const { data: artist_account_socials } = await client
      .from("account_socials")
      .select("*")
      .eq("account_id", artistAccountId);

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
