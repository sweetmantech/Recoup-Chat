import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const getFunnelAnalysis = async (pilotId: string) => {
  const client = getSupabaseServerAdminClient();
  const { data } = await client
    .from("funnel_analytics")
    .select(
      `*,
      accounts (
        *,
        account_info (
          *
        ),
        account_socials (
          *
        )
      ),
      funnel_analytics_segments (
        icon,
        name,
        size
      ),
      funnel_analytics_accounts (
        *,
        accounts (
          *,
          account_info (
            *
          ),
          account_socials (
            *
          )
        )
      ),
      funnel_analytics_comments (
        post_url,
        comment,
        username,
        type,
        timestamp
      )`,
    )
    .eq("pilot_id", pilotId);

  return data;
};

export default getFunnelAnalysis;
