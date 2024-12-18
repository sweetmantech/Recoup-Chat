import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnels = () => {
  const { tiktokRawReportContent, tiktokAnalysis } = useTikTokReportProvider();
  const pathname = usePathname();
  const [funnelContext, setFunnelContext] = useState("");
  const searchParams = useSearchParams();
  const tiktok_report = searchParams.get("tiktok_report");

  useEffect(() => {
    if (pathname.includes("tiktok") || tiktok_report) {
      setFunnelContext(
        tiktokRawReportContent || JSON.stringify(tiktokAnalysis),
      );
    }
  }, [pathname]);

  return {
    funnelContext,
  };
};

export default useFunnels;
