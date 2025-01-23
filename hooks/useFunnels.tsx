import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnels = () => {
  const { funnelRawReportContent, funnelAnalysis } = useFunnelReportProvider();
  const [funnelContext, setFunnelContext] = useState("");
  const searchParams = useSearchParams();
  const funnel_report = searchParams.get("funnel_report");
  const active_analaysis_id = searchParams.get("active_analaysis_id");
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.includes("tiktok") ||
      pathname.includes("twitter") ||
      funnel_report ||
      active_analaysis_id
    ) {
      setFunnelContext(
        funnelRawReportContent || JSON.stringify(funnelAnalysis),
      );
    }
  }, [pathname, funnel_report]);

  return {
    funnelContext,
    setFunnelContext,
  };
};

export default useFunnels;
