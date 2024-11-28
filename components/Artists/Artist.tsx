import { useArtistProvider } from "@/providers/ArtistProvider";
import { ArtistRecord } from "@/types/Artist";

const Artist = ({ artist }: { artist: ArtistRecord }) => {
  const { setSelectedArtist } = useArtistProvider();

  return (
    <button
      type="button"
      className="w-[335px] h-[162px] overflow-hidden rounded-xl relative border-grey border"
      onClick={() => setSelectedArtist(artist)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.image || "https://i.imgur.com/QCdc8Ai.jpg"}
        className="object-cover w-full h-full"
        alt="not found pic"
      />
      <div className="rounded-full flex items-center justify-center text-white absolute left-4 bottom-4">
        {artist.name}
      </div>
    </button>
  );
};

export default Artist;
