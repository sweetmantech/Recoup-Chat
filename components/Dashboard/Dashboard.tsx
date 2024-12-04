import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";

const Dashboard = () => {
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="grow h-[calc(100vh-64px)] md:h-screen overflow-hidden md:bg-background md:p-4">
      <div className="size-full bg-white rounded-xl flex flex-col items-center md:items-start gap-3 pt-6 md:pt-10 md:pb-6 px-4 md:px-20">
        <p className="font-plus_jakarta_sans_bold text-[50px]">Dashboard</p>
        <p className="text-[19px] md:text-[25px] text-grey-dark text-center md:text-left">
          The most important metrics, campaigns, and convos about your artist.
        </p>
        <div className="grow relative rounded-md overflow-hidden w-full">
          <div className="bg-[#00000000] size-full absolute left-0 top-0 backdrop-blur-[7px] flex items-center justify-center md:justify-end md:pr-8 z-[2]">
            <p className="text-[40px] md:text-[50px] text-white font-plus_jakarta_sans_bold">
              Coming Soon
            </p>
          </div>
          <div className="size-full relative z-[1]">
            <ImageWithFallback src={selectedArtist?.image || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
