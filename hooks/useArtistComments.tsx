import getCommentsByArtistId from "@/lib/getCommentsByArtistId";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useEffect, useState } from "react";

const useArtistComments = () => {
  const [comments, setComments] = useState<any>([]);
  const { selectedArtist } = useArtistProvider();

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

  return {
    comments,
  };
};

export default useArtistComments;
