import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import ReportHTML from "./ReportHTML";
import ReportSummaryNote from "./ReportNextSteps";
import { useEffect, useState } from "react";
import getFunnelReport from "@/lib/getFunnelReport";
import getArtist from "@/lib/getArtist";
import getPdfReport from "@/lib/getPdfReport";
import ReportSkeleton from "./ReportSkeleton";

const SegmentReport = ({
  referenceId,
  artistId,
}: {
  referenceId: string;
  artistId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { specificReportParams } = useToolCallProvider();
  const { rawReportContent, nextSteps, reportContent } = specificReportParams;
  const {
    funnelRawReportContent,
    funnelNextSteps,
    funnelReportContent,
    setBannerImage,
    setBannerArtistName,
    setFunnelNextSteps,
    setFunnelRawReportContent,
    setFunnelReportContent,
    isLoadingReport,
  } = useFunnelReportProvider();

  useEffect(() => {
    const init = async () => {
      if (!referenceId) return;
      setIsLoading(true);
      const response = await getFunnelReport(referenceId);
      const artist = await getArtist(artistId);
      setBannerImage(artist?.image || "");
      setBannerArtistName(artist?.name || "");
      setFunnelRawReportContent(response.report);
      setFunnelReportContent(getPdfReport(response.report));
      setFunnelNextSteps(response.next_steps);
      setIsLoading(false);
    };
    if (referenceId) init();
    // eslint-disable-next-line
  }, [referenceId]);

  return (
    <div className="w-full">
      {isLoading || isLoadingReport ? (
        <ReportSkeleton />
      ) : (
        <div className="w-full">
          <div>
            <ReportHTML
              rawContent={rawReportContent || funnelRawReportContent}
            />
            <ReportSummaryNote
              reportContent={reportContent || funnelReportContent}
              nextSteps={nextSteps || funnelNextSteps}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentReport;
