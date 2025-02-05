import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";

import { AI_MODEL } from "@/lib/consts";
import getSystemMessage from "@/lib/chat/getSystemMessage";
import { z } from "zod";
import { ArtistToolResponse } from "@/types/Tool";

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;
  const context = body.context;

  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    throw new Error("No messages provided");
  }

  const chatContext =
    messages.length > 2
      ? context || messages[messages.length - 2].content
      : context;
  const question = lastMessage.content;

  const result = streamText({
    model: openai(AI_MODEL),
    messages: [
      ...messages,
      {
        role: "assistant",
        content: getSystemMessage(chatContext, question),
      },
    ],
    tools: {
      createArtist: tool({
        description: `Get the weather in a location`,
        parameters: z.object({
          artist_name: z
            .string()
            .optional()
            .describe("The name of the artist to be created."),
        }),
        execute: async ({ artist_name }) => ({
          context: {
            status: ArtistToolResponse.CREATE_ARTIST,
            args: {
              artistName: artist_name || "",
            },
          },
          question,
        }),
      }),
    },
  });

  return result.toDataStreamResponse();
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
