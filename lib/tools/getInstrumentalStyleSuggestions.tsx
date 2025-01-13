import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";
import instructions from "@/evals/scripts/instructions.json";

const getInstrumentalStyleSuggestions = (question: string) =>
  tool({
    description: instructions.instrumental_style_trigger,
    parameters: z.object({}),
    execute: async () => {
      return {
        context: {
          status: ArtistToolResponse.INSTRUMENTAL_STYLE_SUGGESTION,
        },
        question,
      };
    },
  });

export default getInstrumentalStyleSuggestions;
