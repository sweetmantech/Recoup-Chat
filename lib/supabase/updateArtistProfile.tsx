import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const updateArtistProfile = async (
  artistId: string,
  email: string,
  image: string,
  name: string,
  instruction: string,
  label: string,
  knowledges: string,
) => {
  const client = getSupabaseServerAdminClient();

  if (artistId) {
    const { data } = await client
      .from("accounts")
      .update({
        name,
        id: artistId,
      })
      .eq("id", artistId)
      .select("*")
      .single();

    if (!data) throw Error("artist does not exist.");

    const { data: account_info } = await client
      .from("account_info")
      .select("*")
      .eq("account_id", artistId)
      .single();
    if (account_info) {
      await client
        .from("account_info")
        .update({
          ...account_info,
          image,
          instruction,
          knowledges,
          label,
        })
        .eq("account_id", artistId)
        .select("*");
    } else {
      await client
        .from("account_info")
        .insert({
          image,
          instruction,
          knowledges,
          label,
          account_id: artistId,
        })
        .select("*")
        .single();
    }
    return artistId;
  } else {
    const { data } = await client
      .from("account_emails")
      .select("*")
      .eq("email", email)
      .single();

    const { data: newArtistAccount } = await client
      .from("accounts")
      .insert({
        name,
      })
      .select("*")
      .single();

    await client
      .from("account_artist_ids")
      .insert({
        account_id: data.account_id,
        artist_id: newArtistAccount.id,
      })
      .select("*")
      .single();
    await client.from("account_info").insert({
      image,
      instruction,
      knowledges,
      label,
      account_id: newArtistAccount.id,
    });
    return newArtistAccount.id;
  }
};

export default updateArtistProfile;
