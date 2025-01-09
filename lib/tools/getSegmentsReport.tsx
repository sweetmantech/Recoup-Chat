import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";
import getFunnelAnalysis from "../chat/getFunnelAnalysis";
import { FUNNEL_ANALYSIS } from "@/types/Agent";

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

      const funnel_analysises = await getFunnelAnalysis(chat_id);
      if (!funnel_analysises) return;
      const wrappedAnalysis = funnel_analysises.find(
        (funnel_analysis: FUNNEL_ANALYSIS) => !funnel_analysis.type,
      );
      const wrappedSegments = wrappedAnalysis?.funnel_analytics_segments;
      const wrappedProfile = wrappedAnalysis?.funnel_analytics_profile?.[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const segments: any = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profiles: any = [];
      if (wrappedAnalysis) {
        profiles.push(wrappedProfile);
        segments.push(wrappedSegments);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        funnel_analysises.map((funnel_analysis: any) => {
          segments.push(funnel_analysis.funnel_analytics_segments);
          profiles.push(funnel_analysis.funnel_analytics_profile?.[0]);
        });
      }

      const segmentsFlatten = segments.flat();
      const segment = segmentsFlatten?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.name === segment_name,
      );

      return {
        context: {
          status: ArtistToolResponse.FUNNEL_SEGMENT_REPORT,
          profiles,
          analysis: {
            ...funnel_analysises,
            segment_name: segment_name,
            segment_size: segment?.size,
          },
        },
        question,
      };
    },
  });

export default getSegmentsReport;
