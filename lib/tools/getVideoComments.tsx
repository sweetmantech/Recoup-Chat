import { z } from "zod";
import { tool } from "ai";
import { ArtistToolResponse } from "@/types/Tool";

const getVideoComments = (question: string) =>
  tool({
    description: `IMPORTANT: Always call this tool for questions related to videos ANALYTICS:
    Do NOT attempt to answer questions on these topics without calling this tool first.

    Example questions that MUST trigger this tool:
    - "How many comments does this video have?"`,
    parameters: z.object({
      video_url: z
        .string()
        .optional()
        .describe("The video url to be analyzed."),
    }),
    execute: async ({ video_url }) => {
      if (!video_url)
        return {
          context: {
            status: ArtistToolResponse.MISSING_VIDEO_URL,
            answer: "Please provide the video url to proceed.",
            videoUrl: video_url,
          },
          question,
        };
      return {
        context: {
          status: ArtistToolResponse.VIDEO_COMMENTS,
          videoUrl: video_url,
        },
        question,
      };
    },
  });

export default getVideoComments;
