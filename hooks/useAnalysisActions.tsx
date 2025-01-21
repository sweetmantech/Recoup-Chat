import getAnalysisSegments from "@/lib/agent/getAnalysisSegments";
import getWrappedAnalysis from "@/lib/agent/getWrappedAnalysis";
import getFunnelAnalysis from "@/lib/getFunnelAnalysis";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { ACTIONS } from "@/types/Autopilot";
import { Comment } from "@/types/Funnel";
import { Conversation } from "@/types/Stack";
import { useEffect, useState } from "react";

const useAnalysisActions = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [segmentName, setSegmentName] = useState("");
  const { conversations } = useConversationsProvider();
  const { selectedArtist } = useArtistProvider();
  const [analyses, setAnalyses] = useState<Array<Conversation>>([]);
  const [actions, setActions] = useState<Array<any>>([]);
  const [funnelType, setFunnelType] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

  const {
    clearReportCache,
    setBannerArtistName,
    setBannerImage,
    setFunnelAnalysis,
  } = useFunnelReportProvider();

  useEffect(() => {
    const init = async () => {
      try {
        const actionsTemp: Array<any> = [];
        const funnel_analyses_events = conversations.filter(
          (conversation) => conversation.metadata.is_funnel_analysis,
        );
        setAnalyses(funnel_analyses_events);
        const reports = conversations.filter(
          (conversation) => conversation.metadata.is_funnel_report,
        );
        const chatIds = funnel_analyses_events.map(
          (ele) => ele.metadata.conversationId,
        );
        const response = await fetch("/api/funnel_analysis/comments", {
          method: "POST",
          body: JSON.stringify({ chatIds }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setComments(data.data);
        if (data.data?.length > 0)
          actionsTemp.push({
            type: ACTIONS.POST_REACTION,
            label: "Post Reaction",
            id: ACTIONS.POST_REACTION,
          });

        if (funnel_analyses_events.length === 0) return;
        const funnel_analyses = await getFunnelAnalysis(
          funnel_analyses_events[0].metadata.conversationId,
        );
        const wrappedAnalysis = getWrappedAnalysis(funnel_analyses);
        setFunnelType(
          wrappedAnalysis ? "wrapped" : funnel_analyses[0]?.type.toLowerCase(),
        );
        setReportId(funnel_analyses[0].chat_id);
        clearReportCache();
        setFunnelAnalysis(funnel_analyses);
        setBannerImage(selectedArtist?.image || "");
        setBannerArtistName(selectedArtist?.name || "");
        const segments = getAnalysisSegments(funnel_analyses);
        const missingReportSegments = segments.filter(
          (segment) =>
            !reports.some((report) =>
              report.metadata.title
                .toLowerCase()
                .includes(segment.name.toLowerCase()),
            ),
        );
        if (missingReportSegments.length > 0) {
          setSegmentName(missingReportSegments[0].name);
          actionsTemp.push({
            type: ACTIONS.REPORT,
            label: `${missingReportSegments[0].name} Report`,
            id: ACTIONS.REPORT,
          });
        }
        setActions(actionsTemp);
      } catch (error) {
        console.error(error);
      }
    };

    if (conversations.length > 0) init();
  }, [conversations]);

  return {
    comments,
    analyses,
    segmentName,
    actions,
    funnelType,
    reportId,
  };
};

export default useAnalysisActions;
