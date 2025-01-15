import { useArtistProvider } from "@/providers/ArtistProvider";
import { ArtistRecord } from "@/types/Artist";
import ImageWithFallback from "../ImageWithFallback";
import { EllipsisVertical } from "lucide-react";

const Artist = ({
  artist,
  toggleDropDown,
}: {
  artist: ArtistRecord;
  toggleDropDown: () => void;
}) => {
  const {
    setSelectedArtist,
    selectedArtist,
    toggleUpdate,
    toggleSettingModal,
  } = useArtistProvider();

  return (
    <div
      className={`flex gap-1 justify-between items-center px-2 py-1 text-sm rounded-md text-grey-light-2 hover:text-grey-dark ${selectedArtist?.id === artist.id && "bg-grey-light-1 !text-grey-dark"}`}
    >
      <div className="w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center border">
        <ImageWithFallback src={artist.image || ""} />
      </div>
      <button
        key={artist.id}
        onClick={() => {
          toggleDropDown();
          setSelectedArtist(artist);
        }}
        className="text-left"
        type="button"
      >
        {artist.name}
      </button>
      <button
        type="button"
        onClick={() => {
          toggleUpdate(artist);
          toggleSettingModal();
        }}
      >
        <EllipsisVertical className="size-5" />
      </button>
    </div>
  );
};

export default Artist;
