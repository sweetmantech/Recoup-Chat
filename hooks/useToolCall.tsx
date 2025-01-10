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

const useToolCall = (message: Message) => {
  const { finalCallback } = useMessagesProvider();
  const { conversation: conversationId } = useParams();
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question } = useToolCallParams(message);
  const { setBeginCall, answer, loading, messages } = useToolMessages(
    question,
    toolName,
  );
  const { setSelectedArtist, artists } = useArtistProvider();
  const { setBannerArtistName, setBannerImage, bannerArtistName, bannerImage } =
    useFunnelReportProvider();
  const {
    setFunnelNextSteps,
    setIsGettingAnalysis,
    setFunnelAnalysis,
    setFunnelReportContent,
    setFunnelRawReportContent,
    isGettingAnalysis,
    setPitchName,
    funnelRawReportContent,
  } = useFunnelReportProvider();
  const { email } = useUserProvider();

  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      console.log(
        "ZIAD HERE",
        isActiveToolCallTrigger(toolName, context?.status),
      );
      if (isActiveToolCallTrigger(toolName, context?.status)) {
        if (toolName === Tools.getSegmentsReport && !isGettingAnalysis) {
          const activeArtist = artists.find(
            (artist: ArtistRecord) => artist.id === context?.analysis?.artistId,
          );
          if (activeArtist) {
            setSelectedArtist(activeArtist);
          }
          setIsGettingAnalysis(true);
          setFunnelAnalysis(context?.analysis);
          const bannerArtist = context?.profiles?.find(
            (profile: any) => profile?.nickname && profile?.avatar,
          );
          setBannerImage(bannerArtist?.avatar);
          setBannerArtistName(bannerArtist?.nickname);
          const { reportContent, rawContent } = await getFullReport({
            ...context?.analysis,
            artistImage: bannerArtist?.avatar,
            artistName: bannerArtist?.nickname,
            email,
          });
          setFunnelReportContent(reportContent);
          setFunnelRawReportContent(rawContent);
          const nextSteps = await getReportNextSteps(context?.analysis);
          setFunnelNextSteps(nextSteps);
          setIsGettingAnalysis(false);
        }
        if (toolName === Tools.getPitchReport && !isGettingAnalysis) {
          setIsGettingAnalysis(true);
          setPitchName(context?.pitch_name);
          const { reportContent, rawContent } = await getFullReport({
            content: funnelRawReportContent,
            pitch_name: context?.pitch_name,
            artistImage: bannerArtistName,
            artistName: bannerImage,
            email,
          });
          setFunnelReportContent(reportContent);
          setFunnelRawReportContent(rawContent);
          const nextSteps = await getReportNextSteps(context?.analysis);
          setFunnelNextSteps(nextSteps);
          setIsGettingAnalysis(false);
        }
        setBeginCall(true);
      }
    };
    if (!context || !question) return;
    init();
  }, [question, context, toolName]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
    messages,
  };
};

export default useToolCall;
