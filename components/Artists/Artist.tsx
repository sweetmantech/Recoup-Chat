import { ArtistRecord } from "@/types/Artist";

const Artist = ({ artist }: { artist: ArtistRecord }) => {
  return (
    <button
      type="button"
      className="w-[335px] h-[162px] overflow-hidden rounded-xl relative border-grey border"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.image || "https://i.imgur.com/QCdc8Ai.jpg"}
        className="object-cover"
        alt="not found pic"
      />
      <div className="w-[62px] h-[25px] rounded-full flex items-center justify-center text-white absolute left-4 bottom-4">
        {artist.name}
      </div>
    </button>
  );
};

export default Artist;
