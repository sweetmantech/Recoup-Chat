import { Funnel_Type } from "@/types/Funnel";
import { useRouter } from "next/navigation";
import Icon, { IconsType } from "../Icon";
const FunnelCard = ({
  funnelName,
  icon,
}: {
  funnelName: string;
  icon?: IconsType;
}) => {
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-full h-[162px] overflow-hidden rounded-xl"
      onClick={() => push(`/funnels/${funnelName}/`)}
    >
      <div
        className="relative bg-cover size-full flex flex-col items-start justify-end pb-4 pl-4"
        style={{
          backgroundImage: `url('/${funnelName}.png')`,
        }}
      >
        <p className="text-white text-2xl text-left capitalize">
          {funnelName === Funnel_Type.TWITTER ? "X" : funnelName} Analyzer
        </p>
        <p className="text-white text-left text-[15px] pr-1">
          Analyze your{" "}
          <span className="capitalize">
            {funnelName === Funnel_Type.TWITTER ? "X" : funnelName}
          </span>{" "}
          fans to uncover trends, interests, and growth opportunities.
        </p>
        {icon && (
          <div className="absolute right-4 top-4">
            <Icon name={icon} />
          </div>
        )}
      </div>
    </button>
  );
};

export default FunnelCard;
