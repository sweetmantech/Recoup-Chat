import getCommentsByArtistId from "@/lib/getCommentsByArtistId";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { ACTIONS } from "@/types/Autopilot";
import { useEffect, useState } from "react";

const useArtistComments = () => {
  const [comments, setComments] = useState<any>([]);
  const { selectedArtist } = useArtistProvider();
  const [actions, setActions] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getCommentsByArtistId(
          selectedArtist?.account_id || "",
        );
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (!selectedArtist) return;
    init();
  }, [selectedArtist]);

  useEffect(() => {
    if (comments.length) {
      setActions([
        {
          type: ACTIONS.POST_REACTION,
          title: "Post Reaction",
          id: ACTIONS.POST_REACTION,
          timestamp: new Date().getTime(),
        },
        {
          type: ACTIONS.CONTENT_CALENDAR,
          title: "Content Calendar",
          id: ACTIONS.CONTENT_CALENDAR,
          timestamp: new Date().getTime(),
        },
      ]);
      return;
    }
    setActions([]);
  }, [comments]);

  return {
    comments,
    artistActions: actions,
  };
};

export default useArtistComments;
