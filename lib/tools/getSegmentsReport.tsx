import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";

const getSegmentsReport = (question: string) =>
  tool({
    description: `**IMPORTANT:** Always call this tool for ANY question related to fan segments report:
Do NOT attempt to answer questions on these topics without consulting this tool first.
For Example:
"Please create a fan segment report for {chat_id} using this segment {segment_name}"`,
    parameters: z.object({
      chat_id: z.string().optional().describe("The chat id of funnel."),
      segment_name: z.string().optional().describe("The segment name."),
    }),
    execute: async ({ chat_id, segment_name }) => {
      if (!chat_id || !segment_name)
        return {
          context: {
            status: ArtistToolResponse.MISSING_SEGMENT_NAME_ANALYSIS_ID,
          },
          question,
        };

      return {
        context: {
          status: ArtistToolResponse.FUNNEL_SEGMENT_REPORT,
          analysis: null,
        },
        question,
      };
    },
  });

export default getSegmentsReport;
