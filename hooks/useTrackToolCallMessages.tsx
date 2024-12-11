import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { Tools } from "@/types/Tool";
import { Message } from "ai";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const useTrackToolCallMessages = (
  question: string,
  toolName: string,
  isLoading: boolean,
  messages: Message[],
) => {
  const { finalCallback } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const { tiktokRawReportContent, tiktokNextSteps } = useTikTokReportProvider();

  useEffect(() => {
    const track = async () => {
      await finalCallback(
        {
          id: uuidV4(),
          content: "TikTok Report",
          role: "assistant",
        },
        {
          id: uuidV4(),
          content: question as string,
          role: "user",
        },
        conversationId as string,
      );
    };
    if (
      !isLoading &&
      messages?.length === 2 &&
      tiktokRawReportContent &&
      tiktokNextSteps &&
      toolName === Tools.getSegmentsReport
    )
      track();
  }, [isLoading, messages, tiktokNextSteps, tiktokRawReportContent]);
};

export default useTrackToolCallMessages;
