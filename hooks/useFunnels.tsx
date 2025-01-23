import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnels = () => {
  const { funnelRawReportContent, funnelAnalysis } = useFunnelReportProvider();
  const [funnelContext, setFunnelContext] = useState("");
  const searchParams = useSearchParams();
  const is_funnel_report = searchParams.get("is_funnel_report");
  const active_analaysis_id = searchParams.get("active_analaysis_id");
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.includes("tiktok") ||
      pathname.includes("twitter") ||
      is_funnel_report ||
      active_analaysis_id
    ) {
      setFunnelContext(
        funnelRawReportContent || JSON.stringify(funnelAnalysis),
      );
    }
  }, [pathname, is_funnel_report]);

  return {
    funnelContext,
    setFunnelContext,
  };
};

export default useFunnels;
