import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const getTikTokAnalysis = async (analysis_id: string) => {
  const client = getSupabaseServerAdminClient();
  const { data } = await client
    .from("tiktok_analysis")
    .select("*")
    .eq("id", analysis_id)
    .single();

  return data;
};

export default getTikTokAnalysis;
