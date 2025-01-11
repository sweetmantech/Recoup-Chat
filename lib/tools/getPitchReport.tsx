import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";
import instructions from "../../evals/scripts/instructions.json";

const getPitchReport = (question: string) =>
  tool({
    description: instructions.pitch_report_trigger,
    parameters: z.object({
      pitch_name: z.string().optional().describe("The pitch name."),
    }),
    execute: async ({ pitch_name }) => {
      if (!pitch_name)
        return {
          context: {
            status: ArtistToolResponse.MISSING_PITCH_NAME,
          },
          question,
        };

      return {
        context: {
          status: ArtistToolResponse.FUNNEL_PITCH_REPORT,
          pitch_name,
        },
        question,
      };
    },
  });

export default getPitchReport;
