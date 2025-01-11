import { Message } from "ai";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useToolMessages from "./useToolMessages";
import { useParams } from "next/navigation";
import getToolCallMessage from "@/lib/getToolCallMessage";
import useToolCallParams from "./useToolCallParams";
import isActiveToolCallTrigger from "@/lib/isActiveToolCallTrigger";
import { Tools } from "@/types/Tool";
import getReportNextSteps from "@/lib/getReportNextSteps";
import { ArtistRecord } from "@/types/Artist";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import getFullReport from "@/lib/getFullReport";
import { useUserProvider } from "@/providers/UserProvder";
import getPitchReport from "@/lib/getPitchReport";

const useToolCall = (message: Message) => {
  const { finalCallback } = useMessagesProvider();
  const { conversation: conversationId } = useParams();
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question, specificReportParams, trackReport } =
    useToolCallParams(message);
  const { setBeginCall, answer, loading, messages } = useToolMessages(
    question,
    toolName,
  );
  const { setSelectedArtist, artists } = useArtistProvider();
  const funnelReport = useFunnelReportProvider();
  const { email } = useUserProvider();

  useEffect(() => {
    const init = async () => {
      const newToolCallMessage: any = getToolCallMessage(toolName, context);
      if (newToolCallMessage) {
        finalCallback(
          newToolCallMessage,
          { id: uuidV4(), content: question, role: "user" },
          conversationId as string,
        );
        return;
      }
      const isAssistant = message.role === "assistant";
      if (!isAssistant || isCalled) return;
      setIsCalled(true);
      if (isActiveToolCallTrigger(toolName, context?.status)) {
        if (
          toolName === Tools.getSegmentsReport &&
          !funnelReport.isGettingAnalysis &&
          conversationId
        ) {
          const activeArtist = artists.find(
            (artist: ArtistRecord) => artist.id === context?.analysis?.artistId,
          );
          if (activeArtist) {
            setSelectedArtist(activeArtist);
          }
          funnelReport.setIsGettingAnalysis(true);
          funnelReport.setFunnelAnalysis(context?.analysis);
          const bannerArtist = context?.profiles?.find(
            (profile: any) => profile?.nickname && profile?.avatar,
          );
          funnelReport.setBannerImage(bannerArtist?.avatar);
          funnelReport.setBannerArtistName(bannerArtist?.nickname);
          const { reportContent, rawContent } = await getFullReport({
            ...context?.analysis,
            artistImage: bannerArtist?.avatar,
            artistName: bannerArtist?.nickname,
            email,
          });
          funnelReport.setFunnelReportContent(reportContent);
          funnelReport.setFunnelRawReportContent(rawContent);
          const nextSteps = await getReportNextSteps(context?.analysis);
          funnelReport.setFunnelNextSteps(nextSteps);
          await trackReport(
            conversationId as string,
            rawContent,
            nextSteps,
            false,
          );
          funnelReport.setIsGettingAnalysis(false);
        }
        if (toolName === Tools.getPitchReport && conversationId) {
          specificReportParams.setIsGeneratingReport(true);
          const { reportContent, rawContent } = await getPitchReport({
            content: funnelReport.funnelRawReportContent,
            pitch_name: context?.pitch_name,
            artistImage: funnelReport.bannerArtistName,
            artistName: funnelReport.bannerImage,
            email,
          });
          specificReportParams.setReportContent(reportContent);
          specificReportParams.setRawReportContent(rawContent);
          const nextSteps = await getReportNextSteps(context?.analysis);
          specificReportParams.setNextSteps(nextSteps);
          await trackReport(
            conversationId as string,
            rawContent,
            nextSteps,
            true,
          );
          specificReportParams.setIsGeneratingReport(false);
        }
        setBeginCall(true);
      }
    };
    if (!context || !question) return;
    init();
  }, [question, context, toolName, conversationId]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
    messages,
    specificReportParams,
  };
};

export default useToolCall;
