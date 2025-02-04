import getFanSegments from "@/lib/getFanSegments";
import getAgentsInfoFromStack from "@/lib/stack/getAgentsInfoFromStack";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useEffect, useState } from "react";

const useFansSegments = () => {
  const [fansProfiles, setFansProfiles] = useState<any>([]);
  const { conversations } = useConversationsProvider();
  const { address } = useUserProvider();
  const { selectedArtist } = useArtistProvider();

  useEffect(() => {
    const init = async () => {
      const analyses = conversations.filter(
        (conversation) =>
          conversation.metadata.is_funnel_analysis &&
          conversation.metadata?.accountId === selectedArtist?.account_id,
      );
      const agentIds = analyses.map(
        (analysis) => analysis.metadata.conversationId,
      );
      const segments: any = [];
      const commentIds: any = [];
      const agentsPromise = agentIds.map(async (agentId) => {
        const agent = await getAgentsInfoFromStack(agentId, address);
        segments.push(agent.segments);
        commentIds.push(agent.commentIds);
      });
      await Promise.all(agentsPromise);
      const segmentNames = segments.flat().map((segment: any) => segment.name);

      const aggregatedSegmentNames = [...new Set(segmentNames.flat())];
      const aggregatedCommentIds = [...new Set(commentIds.flat())].slice(
        0,
        500,
      );
      const fanSegments = await getFanSegments(
        aggregatedSegmentNames,
        aggregatedCommentIds,
      );
    };
    if (conversations.length && address && selectedArtist) init();
  }, [conversations, address, selectedArtist]);

  return {
    fansProfiles,
  };
};

export default useFansSegments;
