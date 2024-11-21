import { z } from "zod";
import { tool } from "ai";
import getCampaignScore from "../chat/getCampaignScore";

const getScoreInfo = (question: string) =>
  tool({
    description: `IMPORTANT: Always call this tool for ANY question related to:
    1. Highest Scored Fan
    2. Fans Score Info
    3. Most Played Fan
    5. Most Recent Played Fan
    Do NOT attempt to answer questions on these topics without consulting this tool first.

    Example Questions that MUST trigger this tool:
    - "Who achieved the highest game score in this campaign?"
    - "How many unique [users/fans] have participated in this campaign?"
    - "What is the country distribution of fans?"
    - "What is the email count for users with an Apple Music account?"
    - "How many fans does the artist have?"
    - "How is my campaign going?"
    - "What insights can we draw from the latest campaign?"
    - "How many premium subscribers are there?"`,
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
