import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import getFormattedArtist from "../getFormattedArtist";

const getArtistsByEmail = async (email: string) => {
  const client = getSupabaseServerAdminClient();
  const { data: accountEmail } = await client
    .from("account_emails")
    .select("*")
    .eq("email", email)
    .single();
  if (!accountEmail) return [];
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

  const formattedArtists = artists.map((artist) =>
    getFormattedArtist(artist.artist_info),
  );

  return formattedArtists;
};

export default getArtistsByEmail;
