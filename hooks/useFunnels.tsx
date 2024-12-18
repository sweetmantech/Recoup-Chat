import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnels = () => {
  const { funnelRawReportContent, funnelAnalysis } = useFunnelReportProvider();
  const pathname = usePathname();
  const [funnelContext, setFunnelContext] = useState("");
  const searchParams = useSearchParams();
  const funnel_report = searchParams.get("funnel_report");

  useEffect(() => {
    if (pathname.includes("tiktok-account-analysis") || funnel_report) {
      setFunnelContext(
        funnelRawReportContent || JSON.stringify(funnelAnalysis),
      );
    }
  }, [pathname]);

  return {
    funnelContext,
  };
};

export default useFunnels;
