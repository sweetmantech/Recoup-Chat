import { useToolCallProvider } from "@/providers/ToolCallProvider";

const ReportSummaryNote = () => {
  const { tiktokNextSteps } = useToolCallProvider();

  return (
    <>
      <button
        type="button"
        className="text-purple-dark mt-6"
      >{`[Download Full Report PDF]`}</button>
      <p className="pt-4 pb-2 text-[20px]">Next Steps</p>
      <div
        dangerouslySetInnerHTML={{
          __html: tiktokNextSteps,
        }}
      />
    </>
  );
};

export default ReportSummaryNote;
