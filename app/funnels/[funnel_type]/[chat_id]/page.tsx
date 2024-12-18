import FunnelAccountAnalysis from "@/components/Funnels/FunnelAccountAnalysis";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Account Analysis | Recoup",
  description:
    "Get instant insights about any TikTok account's performance and content",
};

const FunnelAccountAnalysisFunnel = () => <FunnelAccountAnalysis />;

export default FunnelAccountAnalysisFunnel;
