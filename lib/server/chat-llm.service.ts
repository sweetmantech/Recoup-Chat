import "server-only";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

import { AI_MODEL } from "../consts";
import getTools from "../chat/getTools";
import getSystemMessage from "../chat/getSystemMessage";

export const ChatMessagesSchema = z.object({
  messages: z.array(
    z.object({
      content: z.string(),
      role: z.enum(["user", "assistant"]),
    }),
  ),
});

export const StreamResponseSchema = ChatMessagesSchema.extend({
  email: z.string(),
  artistId: z.string(),
  context: z.string(),
});

export function createChatLLMService() {
  return new ChatLLMService();
}

class ChatLLMService {
  constructor() {}

  async streamResponse({
    messages,
    context,
  }: z.infer<typeof StreamResponseSchema>) {
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
      tools: getTools(lastMessage.content),
    });

    return result.toDataStreamResponse();
  }
}
