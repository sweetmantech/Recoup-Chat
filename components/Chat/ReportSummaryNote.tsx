import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Icon from "../Icon";
import { useArtistProvider } from "@/providers/ArtistProvider";
import useDownloadReport from "@/hooks/useDownloadReport";

const ReportSummaryNote = () => {
  const { tiktokNextSteps, tiktokReportContent } = useToolCallProvider();
  const { selectedArtist } = useArtistProvider();
  const { downloadReport } = useDownloadReport();
  return (
    <>
      <button
        type="button"
        className="text-purple-dark mt-6"
        onClick={downloadReport}
      >{`[Download Full Report PDF]`}</button>
      <p className="pt-4 pb-2 text-[20px]">Next Steps</p>
      <div
        dangerouslySetInnerHTML={{
          __html: tiktokNextSteps,
        }}
      />
      {tiktokReportContent && (
        <div className="bg-white w-full min-h-screen fixed top-[99999999px] left-0 flex justify-center z-[99999999]">
          <div
            id="segment-report"
            className="text-black max-w-[9.5in] w-full bg-white p-[0.3in] text-[11pt] leading-normal relative box-border min-h-[11in]"
          >
            <div className="w-full aspect-[757/146] rounded-lg flex items-center justify-center overflow-hidden relative">
              {/* eslint-disable-next-line  @next/next/no-img-element */}
              <img
                src={selectedArtist?.image || ""}
                alt="not found pic"
                className="w-full"
              />
              <div className="absolute left-0 top-0 size-full flex items-center justify-end pr-3 gap-2">
                <p className="text-white font-bold text-[40px]">
                  {selectedArtist?.name}
                </p>
                <Icon name="logo-xl" />
                <p className="text-white font-bold text-[40px]">Recoup</p>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: tiktokReportContent,
              }}
            />
            <div className="flex justify-center items-center py-10">
              <Icon name="logo" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportSummaryNote;
