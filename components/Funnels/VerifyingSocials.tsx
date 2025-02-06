import InputHandles from "./InputHandle";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import Icon from "../Icon";
import Loading from "../Loading";
import { useArtistProvider } from "@/providers/ArtistProvider";

const VerifyingSocials = () => {
  const { isCheckingHandles, handles } = useFunnelAnalysisProvider();
  const { selectedArtist } = useArtistProvider();

  if (isCheckingHandles)
    return (
      <main className="grow py-2">
        <div className="px-4 md:max-w-3xl md:mx-auto md:w-full h-full md:pt-4 flex flex-col bg-white">
          <div className="md:grow flex flex-col pb-4 h-full">
            <div className="flex gap-3 items-center">
              <div className="border border-gray rounded-full p-2">
                <Icon name="logo-xs" />
              </div>
              <div className="flex gap-2 items-center text-sm">
                Verifying @{selectedArtist?.name}
                ’s Social Handles...
                <Loading />
              </div>
            </div>
            <div className="pl-11 pt-2">
              {Object.keys(handles).length > 0 && <InputHandles />}
            </div>
          </div>
        </div>
      </main>
    );
};

export default VerifyingSocials;
