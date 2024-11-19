import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import getTopScore from "./getTopScore";
import getMostPlayed from "./getMostPlayed";
import getStreamsCount from "./getStreamsCount";
import getSpotifyFansPast7 from "./getSpotifyFansInPast";
import getStartedFans from "./getStartedFans";
import getFollowersInPast from "./getFollowersInPast";
import getUsersScore from "../stack/getUsersScore";
import { SCORE_EVENT } from "@/types/score";
import getRecentScore from "./getRecentScore";
import getScoresInPast24 from "./getScoresInPast24";

const getChatContext = async (email: string, artistId: string) => {
  const client = getSupabaseServerAdminClient();
  const scores: SCORE_EVENT[] = await getUsersScore();

  const fans_score_info = scores.map((score: SCORE_EVENT) => ({
    username: score.metadata.username,
    timeToGetScore: score.metadata.time,
    fanId: score.metadata.userId,
    score: score.points,
    playedAt: new Date(score.timestamp).toDateString(),
  }));
  const highest_scored_fan = getTopScore(scores);
  const most_played_fan = getMostPlayed(scores);
  const average_streamed_count = await getStreamsCount(client, email, artistId);
  const users = await getSpotifyFansPast7(client, 7 * 24 * 60 * 60 * 1000);
  const users_in_past7 = users.map((user) => Object.values(user));
  const users_started_signed_spotify = await getStartedFans(client);
  const followers_count_in_past24hr = await getFollowersInPast(
    client,
    24 * 60 * 60 * 1000,
  );
  const most_recent_fan_score = getRecentScore(scores);
  const scores_in_past24 = getScoresInPast24(scores);

  return {
    fans_score_info,
    highest_scored_fan,
    most_played_fan,
    average_streamed_count,
    users_in_past7,
    users_started_signed_spotify,
    followers_count_in_past24hr,
    most_recent_fan_score,
    scores_in_past24,
  };
};

export default getChatContext;
