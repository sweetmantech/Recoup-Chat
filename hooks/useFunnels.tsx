import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnels = () => {
  const { funnelRawReportContent, funnelAnalysis } = useFunnelReportProvider();
  const pathname = usePathname();
  const [funnelContext, setFunnelContext] = useState("");
  const searchParams = useSearchParams();
  const tiktok_report = searchParams.get("tiktok_report");

  useEffect(() => {
    if (pathname.includes("tiktok-account-analysis") || tiktok_report) {
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
