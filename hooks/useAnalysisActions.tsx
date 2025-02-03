import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { ACTION, ACTIONS } from "@/types/Autopilot";
import { Comment } from "@/types/Funnel";
import { Conversation } from "@/types/Stack";
import { useEffect, useState } from "react";

const useAnalysisActions = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [segmentName, setSegmentName] = useState("");
  const { conversations } = useConversationsProvider();
  const [analyses, setAnalyses] = useState<Array<Conversation>>([]);
  const [actions, setActions] = useState<Array<ACTION>>([]);
  const [funnelType, setFunnelType] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);

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
            title: "Post Reaction",
            id: ACTIONS.POST_REACTION,
          });

        if (funnel_analyses_events.length === 0) return;
        actionsTemp.push({
          type: ACTIONS.CONTENT_CALENDAR,
          title: "Content Calendar",
          id: ACTIONS.CONTENT_CALENDAR,
        });
        setActions(actionsTemp);
      } catch (error) {
        console.error(error);
      }
    };

    if (conversations.length > 0) {
      init();
      return;
    }
    setActions([]);
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
