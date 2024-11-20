import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";

const getTopSongListeningFansCount = async (
  artistId: string,
  email: string,
) => {
  try {
    const client = getSupabaseServerAdminClient();
    const { data } = await client.rpc("get_fans_listening_top_songs", {
      artistid: artistId,
      email: email,
    });
    return data?.fans?.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default getTopSongListeningFansCount;
