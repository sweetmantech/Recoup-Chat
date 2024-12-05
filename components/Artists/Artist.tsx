import { useArtistProvider } from "@/providers/ArtistProvider";
import { ArtistRecord } from "@/types/Artist";
import ImageWithFallback from "../ImageWithFallback";

const Artist = ({ artist }: { artist: ArtistRecord }) => {
  const { setSelectedArtist, setArtistActive } = useArtistProvider();

  const handleClick = (artist: ArtistRecord) => {
    setArtistActive(true);
    setSelectedArtist(artist);
  };

  return (
    <button
      type="button"
      className="w-[335px] h-[162px] overflow-hidden rounded-xl relative border-grey border"
      onClick={() => handleClick(artist)}
    >
      <ImageWithFallback
        src={artist.image || "https://i.imgur.com/QCdc8Ai.jpg"}
      />
      <div className="rounded-full flex items-center justify-center text-white absolute left-4 bottom-4">
        {artist.name}
      </div>
    </button>
  );
};

export default Artist;
