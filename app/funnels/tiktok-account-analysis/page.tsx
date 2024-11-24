import { Metadata } from "next";
import TikTokAccountAnalysis from "@/components/Funnels/TikTokAccountAnalysis";
import { TikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";

export const metadata: Metadata = {
  title: "TikTok Account Analysis | Recoup",
  description:
    "Get instant insights about any TikTok account's performance and content",
};

const TikTokAccountAnalysisFunnel = () => (
  <div className="grow h-screen flex">
    <TikTokAnalysisProvider>
      <TikTokAccountAnalysis />
    </TikTokAnalysisProvider>
  </div>
);

export default TikTokAccountAnalysisFunnel;
