import getTopScore from "./getTopScore";
import getMostPlayed from "./getMostPlayed";
import getUsersScore from "../stack/getUsersScore";
import { SCORE_EVENT } from "@/types/score";
import getRecentScore from "./getRecentScore";
import getScoresInPast24 from "./getScoresInPast24";

const getCampaignScore = async () => {
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

  const most_recent_fan_score = getRecentScore(scores);
  const scores_in_past24 = getScoresInPast24(scores);

  return {
    fans_score_info,
    highest_scored_fan,
    most_played_fan,

    most_recent_fan_score,
    scores_in_past24,
  };
};

export default getCampaignScore;
