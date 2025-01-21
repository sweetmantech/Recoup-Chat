import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const getFunnelAnalyticsComments = async (ids: Array<string>) => {
  const client = getSupabaseServerAdminClient();

  const { data: analytics } = await client
    .from("funnel_analytics")
    .select("*")
    .in("chat_id", ids);

  const analysesIds = analytics?.map((analysis) => analysis.id);

  const { data } = await client
    .from("funnel_analytics_comments")
    .select("*")
    .in("analysis_id", analysesIds || [])
    .order("timestamp", { ascending: false });

  return data;
};

export default getFunnelAnalyticsComments;
