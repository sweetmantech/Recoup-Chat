import { useRouter } from "next/navigation";

const FunnelCard = ({ funnelName }: { funnelName: string }) => {
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-[335px] h-[162px] overflow-hidden rounded-xl"
      onClick={() => push(`/funnels/${funnelName}/`)}
    >
      <div className="relative bg-[url('/tiktok.png')] bg-cover size-full flex flex-col items-start justify-end pb-4 pl-4">
        <p className="text-white text-2xl text-left capitalize">
          {funnelName} Analyzer
        </p>
        <p className="text-white text-left text-[15px]">
          Analyze your <span className="capitalize">{funnelName}</span> fans to
          uncover trends, interests, and growth oppertunities.
        </p>
        <div className="bg-white w-[62px] h-[25px] rounded-full flex items-center justify-center text-green absolute right-4 top-4">
          NEW
        </div>
      </div>
    </button>
  );
};

export default FunnelCard;
