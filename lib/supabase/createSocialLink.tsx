import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const createSocialLink = async (
  artistId: string,
  social_type: string,
  social_link: string,
) => {
  const client = getSupabaseServerAdminClient();

  const { data } = await client
    .from("account_socials")
    .select("*")
    .eq("account_id", artistId)
    .eq("type", social_type)
    .single();

  if (data) {
    await client
      .from("account_socials")
      .update({
        ...data,
        link: social_link,
      })
      .eq("id", data.id)
      .select("*")
      .single();
    return;
  }

  await client.from("account_socials").insert({
    link: social_link,
    type: social_type,
    account_id: artistId,
  });
};

export default createSocialLink;
