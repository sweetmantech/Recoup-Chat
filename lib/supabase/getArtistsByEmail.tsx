import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import getSocialPlatformByLink from "../getSocialPlatformByLink";

const getArtistsByEmail = async (email: string) => {
  const client = getSupabaseServerAdminClient();
  const { data: accountEmail } = await client
    .from("account_emails")
    .select("*")
    .eq("email", email)
    .single();
  if (!accountEmail) return Response.json({ artists: [] }, { status: 200 });
  const accountId = accountEmail.account_id;
  const { data: artists } = await client
    .from("account_artist_ids")
    .select(
      `*,
        artist_info:accounts!account_artist_ids_artist_id_fkey (
          *, 
          account_socials (
            *, 
            social:socials (
              *
            )
          ),
          account_info (
            *
          )
        )  
      `,
    )
    .eq("account_id", accountId);

  if (!artists) return [];

  const formattedArtists = artists.map((artist) => {
    const account_id = artist.artist_id;
    const account_info = artist.artist_info.account_info[0]
    const account_socials = artist.artist_info.account_socials.map((social: any) => ({
      ...social.social,
      link: social.social.profile_url,
      type: getSocialPlatformByLink(social.social.profile_url)
    }))
    return {
      name: artist.artist_info.name,
      ...account_info,
      account_id,
      ...account_socials
    }
  })

  return formattedArtists;
};

export default getArtistsByEmail;
