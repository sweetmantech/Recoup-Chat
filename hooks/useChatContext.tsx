import getCommentsByArtistId from "@/lib/getCommentsByArtistId";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useEffect, useState } from "react";

const useChatContext = () => {
  const { selectedArtist } = useArtistProvider();
  const [chatContext, setChatContext] = useState("");

  useEffect(() => {
    const getChatContext = async () => {
      const comments = await getCommentsByArtistId(
        selectedArtist?.account_id || "",
      );
      const formattedComments = comments.map((comment: any) => ({
        avatar: comment.social.avatar,
        username: comment.username,
        profile_url: comment.profile_url,
      })).slice(0, 500);
      setChatContext(JSON.stringify(formattedComments));
    };
    if (!selectedArtist) {
      setChatContext("");
      return;
    }
    getChatContext();
  }, [selectedArtist]);

  return {
    chatContext,
  };
};

export default useChatContext;
