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
      setChatContext(JSON.stringify(comments));
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
