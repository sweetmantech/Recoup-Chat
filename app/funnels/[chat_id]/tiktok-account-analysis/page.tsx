import TikTokAccountAnalysis from "@/components/Funnels/TikTokAccountAnalysis";
import { TikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";

const TikTokAccountAnalysisFunnel = () => (
  <TikTokAnalysisProvider>
    <TikTokAccountAnalysis />
  </TikTokAnalysisProvider>
);

export default TikTokAccountAnalysisFunnel;
