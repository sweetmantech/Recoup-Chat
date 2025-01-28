import { useArtistProvider } from "@/providers/ArtistProvider";
import { ArtistRecord } from "@/types/Artist";
import ImageWithFallback from "../ImageWithFallback";
import { EllipsisVertical } from "lucide-react";

const Artist = ({
  artist,
  toggleDropDown,
  isMini,
}: {
  artist: ArtistRecord | null;
  toggleDropDown: () => void;
  isMini?: boolean;
}) => {
  const {
    setSelectedArtist,
    selectedArtist,
    toggleUpdate,
    toggleSettingModal,
  } = useArtistProvider();
  const isSelectedArtist = selectedArtist?.id === artist?.id;

  return (
    <button
      className={`${
        isMini
          ? `${isSelectedArtist && "w-fit rounded-full"}`
          : `flex gap-1 justify-between items-center px-2 py-1 text-sm rounded-md text-grey-dark hover:bg-grey-light-1 ${isSelectedArtist && "!bg-grey-light-1"}`
      } h-10`}
      type="button"
      onClick={() => {
        toggleDropDown();
        setSelectedArtist(artist);
      }}
    >
      <div
        className={`w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center ${isSelectedArtist && "shadow-[1px_1px_1px_1px_#E6E6E6]"}`}
      >
        <ImageWithFallback src={artist?.image || ""} />
      </div>
      {!isMini && (
        <>
          <div key={artist?.id} className="text-left max-w-[100px] truncate">
            {artist?.name}
          </div>
          <button
            type="button"
            onClick={() => {
              if (artist) toggleUpdate(artist);
              toggleSettingModal();
            }}
          >
            <EllipsisVertical className="size-5" />
          </button>
        </>
      )}
    </button>
  );
};

export default Artist;
