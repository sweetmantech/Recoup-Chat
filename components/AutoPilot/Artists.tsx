import { useArtistProvider } from "@/providers/ArtistProvider";

const Artists = () => {
  const { artists, setSelectedArtist, toggleCreation } = useArtistProvider();

  return (
    <div className="bg-black/50 p-4 rounded border border-green-900 max-h-[500px] overflow-y-auto">
      <button
        className="text-sm font-bold mb-2 border border-green-700 rounded-md px-2 py-1"
        onClick={toggleCreation}
      >
        CLICK HERE TO CREATE NEW ARTIST
      </button>
      <h2 className="text-sm font-bold mb-1">
        PLEASE, SELECT AN ARTIST TO ACTIVATE...
      </h2>
      <div className="gap-1 flex flex-col items-start">
        {artists.map((artist) => (
          <button
            key={artist.id}
            type="button"
            onClick={() => setSelectedArtist(artist)}
            className="text-xs"
          >
            {artist.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Artists;
