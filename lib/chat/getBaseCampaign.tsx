import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { FAN_TYPE } from "@/types/fans";
import getFollows from "./getFollows";
import getStreamsCount from "./getStreamsCount";
import getStartedFans from "./getStartedFans";
import getFollowersInPast from "./getFollowersInPast";
import limitCollection from "../limitCollection";

const getBaseCampaign = async (artistId: string, email: string) => {
  const client = getSupabaseServerAdminClient();
  const { data: campaign } = await client.rpc("get_campaign", {
    email,
    artistid: artistId,
    campaignid: "",
  });

  const premiumCount =
    campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "premium")
      ?.length || 0;
  const freeCount =
    campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "free")?.length ||
    0;
  const followers = getFollows(client);
  const episodes_names = campaign?.episodes.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (episode: any) => episode.name,
  );
  const episodes_descriptions = campaign?.episodes.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (episode: any) => episode.description,
  );
  const average_streamed_count = await getStreamsCount(client, email, artistId);
  const users_started_signed_spotify = await getStartedFans(client);
  const followers_count_in_past24hr = await getFollowersInPast(
    client,
    24 * 60 * 60 * 1000,
  );

  return {
    tracks: limitCollection(campaign?.tracks || []),
    artists: limitCollection(campaign?.artists || []),
    playlists: limitCollection(campaign?.playlist || []),
    albums: limitCollection(campaign?.albums || []),
    audioBooks: limitCollection(campaign?.audio_books || []),
    episodes: limitCollection(episodes_names || []),
    episodes_descriptions: limitCollection(episodes_descriptions),
    shows: limitCollection(campaign?.shows || []),
    fans: limitCollection(campaign?.fans || [], 500),
    premiumCount,
    freeCount,
    totalFansCount: campaign?.fans.length || 0,
    totalFollowersCount: followers,
    average_streamed_count,
    users_started_signed_spotify,
    followers_count_in_past24hr,
  };
};

export default getBaseCampaign;
