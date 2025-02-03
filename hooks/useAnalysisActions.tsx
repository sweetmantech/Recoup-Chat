import getCommentsByArtistId from "@/lib/getCommentsByArtistId";
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
