import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import ReportHTML from "./ReportHTML";
import ReportSummaryNote from "./ReportNextSteps";
import ReportSkeleton from "./ReportSkeleton";

const SegmentReport = () => {
  const {
    funnelRawReportContent,
    funnelNextSteps,
    funnelReportContent,
    isLoadingReport,
  } = useFunnelReportProvider();

  return (
    <div className="w-full">
      {isLoadingReport ? (
        <ReportSkeleton />
      ) : (
        <div className="w-full">
          <div>
            <ReportHTML rawContent={funnelRawReportContent} />
            <ReportSummaryNote
              reportContent={funnelReportContent}
              nextSteps={funnelNextSteps}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentReport;
