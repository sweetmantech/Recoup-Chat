import { z } from "zod";
import { tool } from "ai";
import getCampaignScore from "../chat/getCampaignScore";

const getScoreInfo = (question: string) =>
  tool({
    description: `**IMPORTANT:** Always call this tool for ANY question related to:

1. Highest Scored Player
2. Players' Score Info
3. Most Played Player
4. Most Recent Played Player

Do NOT attempt to answer questions on these topics without consulting this tool first.

**Trigger conditions**: This tool must be invoked for questions that are explicitly about game scores or player performance metrics related to the items listed above. However, **do not** trigger this tool for questions focusing solely on fan engagement or song performance, such as:

- "How many fans have listened to this artist's top song in the last month?"

**Example Questions that MUST trigger this tool**:

- "Who achieved the highest game score in this campaign?"
`,
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
