import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const getFunnelAnalysis = async (analysis_id: string) => {
  const client = getSupabaseServerAdminClient();
  const { data } = await client
    .from("funnel_analytics")
    .select(
      `*,
        funnel_analytics_segments (
          *
        ),
        funnel_analytics_profile (
          *,
          artists (
            *,
            artist_social_links (
              *
            )
          )
        )`,
    )
    .eq("id", analysis_id)
    .single();

  return data;
};

export default getFunnelAnalysis;
