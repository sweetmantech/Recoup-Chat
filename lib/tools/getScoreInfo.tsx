import { z } from "zod";
import { tool } from "ai";
import getCampaignScore from "../chat/getCampaignScore";

const getScoreInfo = (question: string) =>
  tool({
    description: `IMPORTANT: Always call this tool for ANY question related to:
    1. Highest Scored Player
    2. Players' Score Info
    3. Most Played Player
    5. Most Recent Played Player
    Do NOT attempt to answer questions on these topics without consulting this tool first.

    Example Questions that MUST trigger this tool:
    - "Who achieved the highest game score in this campaign?"`,
    parameters: z.object({}),
    execute: async ({}) => {
      const data = await getCampaignScore();
      return {
        context: data,
        question,
      };
    },
  });

export default getScoreInfo;
