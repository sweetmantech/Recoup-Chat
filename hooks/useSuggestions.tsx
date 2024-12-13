import { SUGGESTIONS } from "@/lib/consts";
import trackNewMessage from "@/lib/stack/trackNewMessage";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useParams, usePathname } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useArtistProvider } from "@/providers/ArtistProvider";
import removeHtmlTags from "@/lib/removeHTMLTags";
import formattedContent from "@/lib/formattedContent";

const useSuggestions = () => {
  const { address } = useUserProvider();
  const { selectedArtist } = useArtistProvider();
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);
  const { conversation: pathId } = useParams();
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

  const finalCallback = async (
    message: Message,
    lastQuestion?: Message,
    newConversationId?: string,
    referenceId?: string,
  ) => {
    const convId = newConversationId || (pathId as string);
    const question = lastQuestion || currentQuestion;
    if (!message.content || !question) return;
    await trackNewMessage(
      address as Address,
      question,
      selectedArtist?.id || "",
      convId,
    );
    await trackNewMessage(
      address as Address,
      {
        ...message,
        content: formattedContent(message.content),
        questionId: question.id,
      },
      selectedArtist?.id || "",
      convId,
      referenceId,
    );
    setCurrentQuestion(null);
    const response = await fetch(
      `/api/prompts?answer=${removeHtmlTags(message.content)}`,
    );
    const data = await response.json();

    setSuggestions(() => [...data.questions]);
  };

  return {
    finalCallback,
    suggestions,
    setCurrentQuestion,
    currentQuestion,
  };
};

export default useSuggestions;
