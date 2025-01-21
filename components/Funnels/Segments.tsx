import Icon from "@/components/Icon";
import LucideIcon from "@/components/LucideIcon";
import useGenerateSegmentReport from "@/hooks/useGenerateSegmentReport";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const Segments = () => {
  const { handleGenerateReport } = useGenerateSegmentReport();
  const { segments } = useFunnelAnalysisProvider();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-3">
      {segments.map((segment) => (
        <button
          className="w-full border-grey-light border-[1px] rounded-md px-3 py-2 flex gap-2 items-center shadow-grey"
          type="button"
          key={segment?.name}
          onClick={() => handleGenerateReport(segment?.name)}
        >
          {segment?.icon ? (
            <LucideIcon name={segment.icon} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <Icon name="logo-xs" />
          )}

          <p className="font-bold text-xs text-center">
            {segment?.name} {`(${segment?.count || segment?.size})`}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Segments;
