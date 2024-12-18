import TikTokAccountAnalysis from "@/components/Funnels/TikTokAccountAnalysis";
import { TikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";

const AccountAnalysisFunnel = () => (
  <TikTokAnalysisProvider>
    <TikTokAccountAnalysis />
  </TikTokAnalysisProvider>
);

export default AccountAnalysisFunnel;
