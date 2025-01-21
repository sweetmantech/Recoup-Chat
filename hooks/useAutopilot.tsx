import { useArtistProvider } from "@/providers/ArtistProvider";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { SOCIAL_LINK } from "@/types/Agent";
import { Comment } from "@/types/Funnel";
import { useEffect, useState } from "react";

export enum ACTIONS {
  POST_REACTION,
  SOCIAL,
}
const useAutopilot = () => {
  const { conversations } = useConversationsProvider();
  const analyses = conversations.filter(
    (conversation) => conversation.metadata.is_funnel_analysis,
  );
  const [actions, setActions] = useState<Array<any>>([]);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const { selectedArtist } = useArtistProvider();

  const deny = (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
  };

  const addAction = (action: any) => {
    const temp = [...actions];
    const findIndex = temp.findIndex((ele) => ele.id === action?.id);
    if (findIndex >= 0) return;
    temp.push(action);
    setActions([...temp]);
  };

  useEffect(() => {
    if (selectedArtist) {
      selectedArtist?.artist_social_links?.map((link: SOCIAL_LINK) => {
        if (!link.link) {
          addAction({
            type: ACTIONS.SOCIAL,
            label: `${link.type.toUpperCase()}: ${selectedArtist?.name}`,
            id: link.id,
          });
        }
      });
    }
  }, [selectedArtist]);

  useEffect(() => {
    const init = async () => {
      const chatIds = analyses.map((ele) => ele.metadata.conversationId);
      try {
        const response = await fetch("/api/funnel_analysis/comments", {
          method: "POST",
          body: JSON.stringify({ chatIds }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) return { error: true };
        const data = await response.json();
        setComments(data.data);
        if (data.data?.length > 0)
          addAction({ type: ACTIONS.POST_REACTION, label: "Post Reaction" });
      } catch (error) {
        console.error(error);
        return { error };
      }
    };

    if (analyses.length > 0) init();
  }, [conversations]);

  return {
    analyses,
    actions,
    comments,
    deny,
  };
};

export default useAutopilot;
