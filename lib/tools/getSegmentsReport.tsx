import { z } from "zod";
import { tool } from "ai";
import getTikTokAnalysis from "../chat/getTikTokAnalysis";
import { ArtistToolResponse } from "@/types/Tool";

const getSegmentsReport = (question: string) =>
  tool({
    description: `**IMPORTANT:** Always call this tool for ANY question related to fan segments report:
Do NOT attempt to answer questions on these topics without consulting this tool first.
For Example:
"Please create a tiktok fan segment report for {analysis_id} using this segment {segment_name}"`,
    parameters: z.object({
      analysis_id: z.string().optional().describe("The analysis id of tiktok."),
      segment_name: z.string().optional().describe("The segment name."),
    }),
    execute: async ({ analysis_id, segment_name }) => {
      if (!analysis_id || !segment_name)
        return {
          context: {
            status: ArtistToolResponse.MISSING_SEGMENT_NAME_ANALYSIS_ID,
          },
          question,
        };

      const data = await getTikTokAnalysis(analysis_id);
      return {
        context: {
          status: ArtistToolResponse.TIKTOK_SEGMENT_REPORT,
          data,
        },
        question,
      };
    },
  });

export default getSegmentsReport;
