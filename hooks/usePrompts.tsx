import { SUGGESTIONS } from "@/lib/consts";
import { Message } from "ai";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";

const usePrompts = () => {
  const { selectedArtist } = useArtistProvider();
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState<Message | null>(null);
  const pathname = usePathname();
  const { funnelAnalysis, funnelRawReportContent } = useFunnelReportProvider();

  useEffect(() => {
    if (selectedArtist) {
      setSuggestions([
        `Who are ${selectedArtist?.name || ""}’s most engaged fans?`,
        `Analyze ${selectedArtist?.name || ""}’s TikTok posts from this week.`,
      ]);
      return;
    }
    setSuggestions(SUGGESTIONS);
  }, [selectedArtist, selectedArtist]);

  const getPrompts = async (content: string, isTikTokAnalysis?: boolean) => {
    const isFunnelReport = content === "Funnel Report";
    const isAnalaysis = pathname.includes("funnels/");
    if (isFunnelReport) content = JSON.stringify(funnelRawReportContent);
    if (isAnalaysis) content = JSON.stringify(funnelAnalysis);

    if (!content) return;
    let promptApiUrl = "/api/prompts";
    if (isFunnelReport) promptApiUrl = "/api/prompots/funnel_report";
    if (isTikTokAnalysis || isAnalaysis)
      promptApiUrl = "/api/prompts/funnel_analysis";

    const response = await fetch(promptApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: content,
      }),
    });
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
