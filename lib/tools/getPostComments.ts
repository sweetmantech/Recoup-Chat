import { z } from "zod";
import { tool } from "ai";
import { generateFakeCommentsData } from "./utils/fakeCommentsData";
import { CommentResponse } from "@/types/Comment";

// Zod schema for parameter validation
const schema = z.object({
  post_id: z.string().optional().default("dev_post_123"),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
});

const getPostComments = tool({
  description:
    "Get social media post comments for testing and development. Returns realistic fake comment data including usernames, comment text, timestamps, follower counts, and user profiles. Use this tool to test comment analysis, user engagement patterns, and pagination features. No post ID required in dev mode.",
  parameters: schema,
  execute: async ({ post_id = "dev_post_123", page = 1, limit = 20 }) => {
    // TEST MODE: Return fake data for development/testing
    const isTestMode = process.env.NODE_ENV === "development" || process.env.USE_FAKE_DATA === "true";
    
    if (isTestMode) {
      console.log(`[TEST MODE] Returning fake comments data for post_id: ${post_id}`);
      return generateFakeCommentsData({ post_id, page, limit });
    }

    // PRODUCTION MODE: Make actual API call
    try {
      // Construct URL with query parameters
      const url = new URL("https://api.recoupable.com/api/post/comments");
      url.searchParams.append("post_id", post_id);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", limit.toString());

      // Make the API request
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = (await response.json()) as CommentResponse;

      return {
        success: true,
        ...data,
      };
    } catch (error) {
      console.error("Error fetching post comments:", error);
      return {
        success: false,
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch post comments",
        comments: [],
        pagination: {
          total_count: 0,
          page: page,
          limit: limit,
          total_pages: 0,
        },
      };
    }
  },
});

export default getPostComments;
