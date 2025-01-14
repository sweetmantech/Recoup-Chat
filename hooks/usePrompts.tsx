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
    const funnel_report =
      content === "Funnel Report" || pathname.includes("funnels/");
    if (funnel_report)
      content = JSON.stringify(funnelAnalysis || {}) || funnelRawReportContent;
    if (!content) return;
    const response = await fetch(
      isTikTokAnalysis || funnel_report
        ? "/api/prompts/funnel_analysis"
        : "/api/prompts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: content,
        }),
      },
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
