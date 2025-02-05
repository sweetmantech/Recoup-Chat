import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";

import { AI_MODEL } from "@/lib/consts";
// import getTools from "../chat/getTools";
import getSystemMessage from "@/lib/chat/getSystemMessage";
import { z } from "zod";

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
      getWeather: tool({
        description: 'Get the weather in a location',
        parameters: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
  });

  return result.toDataStreamResponse();
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
