import FunnelAccountAnalysis from "@/components/Funnels/FunnelAccountAnalysis";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twitter Account Analysis | Recoup",
  description:
    "Get instant insights about any Twitter account's performance and content",
};

const TwitterAccountAnalysisFunnel = () => <FunnelAccountAnalysis />;

export default TwitterAccountAnalysisFunnel;
