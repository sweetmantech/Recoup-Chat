import { Message } from "ai";

export type StackMessage = Message & {
  questionId?: string;
};

export type Conversation = {
  address: string;
  event: string;
  metadata: {
    id: string;
    role: string;
    content: string;
    questionId: string;
    uniqueId: string;
    conversationId: string;
    referenceId: string;
    reportedActive: true;
  };
  points: number;
  timestamp: string;
  title?: string;
  isTikTokAnalysis?: boolean;
  reportedActive?: boolean;
};
