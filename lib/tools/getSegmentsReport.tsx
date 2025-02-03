import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";

const getSegmentsReport = (question: string) =>
  tool({
    description: `**IMPORTANT:** Always call this tool for ANY question related to fan segments report:
Do NOT attempt to answer questions on these topics without consulting this tool first.
For Example:
"Please create a fan segment report for {report_id} using this segment {segment_name}"`,
    parameters: z.object({
      report_id: z.string().optional().describe("The report id of funnel."),
      segment_name: z.string().optional().describe("The segment name."),
    }),
    execute: async ({ report_id, segment_name }) => {
      if (!report_id || !segment_name)
        return {
          context: {
            status: ArtistToolResponse.MISSING_SEGMENT_NAME_ANALYSIS_ID,
          },
          question,
        };

      return {
        context: {
          status: ArtistToolResponse.FUNNEL_SEGMENT_REPORT,
          agentId: report_id,
          segmentName: segment_name,
        },
        question,
      };
    },
  });

export default getSegmentsReport;
