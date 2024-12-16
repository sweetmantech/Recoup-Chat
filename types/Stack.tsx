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
    is_tiktok_report: boolean;
    is_tiktok_analysis: boolean;
    title: string;
    cached_id: string;
    artistId?: string;
  };
  points: number;
  timestamp: string;
  title?: string;
};
