import { SUGGESTIONS } from "@/lib/consts";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useArtistProvider } from "@/providers/ArtistProvider";
import removeHtmlTags from "@/lib/removeHTMLTags";

const usePrompts = () => {
  const { selectedArtist } = useArtistProvider();
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);
  const pathname = usePathname();
  const isNewChat = pathname === "/";

  useEffect(() => {
    if (selectedArtist) {
      setSuggestions([
        `Who are ${selectedArtist?.name || ""}’s most engaged fans?`,
        `Analyze ${selectedArtist?.name || ""}’s TikTok posts from this week.`,
      ]);
      return;
    }
    setSuggestions(SUGGESTIONS);
  }, [isNewChat, selectedArtist, selectedArtist]);

  const getPrompts = async (message: Message) => {
    const response = await fetch(
      `/api/prompts?answer=${removeHtmlTags(message.content)}`,
    );
    const data = await response.json();
    if (!data?.questions) return;
    setSuggestions(() => [...data.questions]);
  };

  return {
    suggestions,
    setCurrentQuestion,
    currentQuestion,
    getPrompts,
  };
};

export default usePrompts;
