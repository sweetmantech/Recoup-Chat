import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import getSocialPlatformByLink from "../getSocialPlatformByLink";
import getUserNameByProfileLink from "../getUserNameByProfileLink";

const updateArtistSocials = async (artistId: string, profileUrls: string) => {
  const client = getSupabaseServerAdminClient();
  const { data: account_socials } = await client
    .from("account_socials")
    .select("*, social:socials(*)")
    .eq("account_id", artistId);

  const profilePromises = Object.entries(profileUrls).map(
    async ([type, value]) => {
      const { data: social } = await client
        .from("socials")
        .select("*")
        .eq("profile_url", value)
        .neq("profile_url", "")
        .single();
      const existingSocial = account_socials?.find(
        // eslint-disable-next-line
        (account_social: any) =>
          getSocialPlatformByLink(account_social.social.profile_url) === type,
      );

      if (existingSocial) {
        await client
          .from("account_socials")
          .delete()
          .eq("account_id", artistId)
          .eq("social_id", existingSocial.social.id);
      }
      if (value) {
        if (social) {
          const { data: socials } = await client
            .from("account_socials")
            .select("*")
            .eq("account_id", artistId)
            .eq("social_id", social.id);
          if (!socials?.length) {
            await client.from("account_socials").insert({
              account_id: artistId,
              social_id: social.id,
            });
          }
        } else {
          const { data: new_social } = await client
            .from("socials")
            .insert({
              username: getUserNameByProfileLink(value),
              profile_url: value,
            })
            .select("*")
            .single();

          if (new_social)
            await client.from("account_social").insert({
              account_id: artistId,
              social_id: new_social.id,
            });
        }
      }
    },
  );

  await Promise.all(profilePromises);
};

export default updateArtistSocials;
