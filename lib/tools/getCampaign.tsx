import { z } from "zod";
import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { tool } from "ai";
import { FAN_TYPE } from "@/types/fans";
import getFollows from "../chat/getFollows";
import limitCollection from "../limitCollection";

const getCampaign = (question: string, email: string, artistId: string) =>
  tool({
    description: `IMPORTANT: Always call this tool for ANY question related to:
    1. Artists
    2. Albums
    3. Episodes(Podcast)
    4. Tracks
    5. Genres
    6. Audio books
    7. Shows
    8. Fans/Users (Premium, Unique fans count, Country distribution and etc)
    9. Email count
    10. Listening habits (from any platform, including Spotify and Apple)
    11. Campaign insights or data
    12. Comparisons or analyses of music consumption or fan behavior

    Do NOT attempt to answer questions on these topics without consulting this tool first.

    Example Questions that MUST trigger this tool:
    - "What are the listening habits from Spotify and Apple?"
    - "How many unique [users/fans] have participated in this campaign?"
    - "What is the country distribution of fans?"
    - "What is the email count for users with an Apple Music account?"
    - "How many fans does the artist have?"
    - "How is my campaign going?"
    - "What insights can we draw from the latest campaign?"
    - "How many premium subscribers are there?"`,
    parameters: z.object({
      artist_name: z.string().optional().describe("artist name"),
    }),
    execute: async ({ artist_name }) => {
      const client = getSupabaseServerAdminClient();
      let artistIdByName = "";
      if (artist_name) {
        const { data } = await client
          .from("artists")
          .select("id")
          .eq("name", artist_name);
        if (data?.length) artistIdByName = data[0].id;
      }
      const { data: campaign } = await client.rpc("get_campaign", {
        email,
        artistid: artistId || artistIdByName,
        campaignid: "",
      });

      const premiumCount =
        campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "premium")
          ?.length || 0;
      const freeCount =
        campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "free")
          ?.length || 0;
      const followers = getFollows(client);
      const episodes_names = campaign?.episodes.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (episode: any) => episode.name,
      );
      const episodes_descriptions = campaign?.episodes.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (episode: any) => episode.description,
      );

      return {
        context: {
          tracks: limitCollection(campaign?.tracks || []),
          artists: limitCollection(campaign?.artists || []),
          playlists: limitCollection(campaign?.playlist || []),
          albums: limitCollection(campaign?.albums || []),
          audioBooks: limitCollection(campaign?.audio_books || []),
          episodes: limitCollection(episodes_names || []),
          episodes_descriptions: limitCollection(episodes_descriptions),
          shows: limitCollection(campaign?.shows || []),
          fans: limitCollection(campaign?.fans || [], 1000),
          premiumCount,
          freeCount,
          totalFansCount: campaign?.fans.length || 0,
          totalFollowersCount: followers,
        },
        question,
      };
    },
  });

export default getCampaign;
