import { useRouter } from "next/navigation";

const Agents = () => {
  const { push } = useRouter();

  return (
    <div className="grow h-screen overflow-hidden bg-background p-4">
      <div className="size-full bg-white rounded-xl flex flex-col gap-3 pt-6 md:pt-10 px-4 md:px-20">
        <p className="font-plus_jakarta_sans_bold text-[50px]">Agents</p>
        <p className="text-[25px] text-grey-dark">
          Unlock the potential of your artist with intelligent, task-focused
          agents.
        </p>
        <div className="pt-8 flex gap-8">
          <button
            type="button"
            className="w-[335px] h-[162px] overflow-hidden rounded-xl"
            onClick={() => push("/funnels/tiktok-account-analysis")}
          >
            <div className="relative bg-[url('/tiktok.png')] bg-cover size-full flex flex-col items-start justify-end pb-4 pl-4">
              <p className="text-white text-2xl text-left">TikTok Analyzer</p>
              <p className="text-white text-left text-[15px]">
                Analyze your TikTok fans to uncover trends, interests, and
                growth oppertunities.
              </p>
              <div className="bg-white w-[62px] h-[25px] rounded-full flex items-center justify-center text-green absolute right-4 top-4">
                NEW
              </div>
            </div>
          </button>
          <button
            type="button"
            className="w-[335px] h-[162px] overflow-hidden rounded-xl"
          >
            <div className="relative bg-[url('/campaign.png')] bg-cover size-full flex flex-col items-start justify-end pb-4 pl-4">
              <p className="text-white text-2xl text-left">Campaign Creator</p>
              <p className="text-white text-left text-[15px]">
                Promote your music and capture <br />{" "}
                {`fan data with Recoup's
                Webplayer.`}
              </p>
              <div className="bg-white w-[62px] h-[25px] rounded-full flex items-center justify-center text-purple absolute right-4 top-4">
                SOON
              </div>
              <div className="bg-[#00000000] size-full absolute left-0 top-0 backdrop-blur-[1px]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agents;
