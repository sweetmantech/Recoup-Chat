import { useArtistProvider } from "@/providers/ArtistProvider";

const Artists = () => {
  const { artists, setSelectedArtist, toggleCreation } = useArtistProvider();

  return (
    <div className="rounded border p-3">
      <button
        className="text-sm font-bold mb-2 border rounded-md px-2 py-1"
        onClick={toggleCreation}
      >
        CLICK HERE TO CREATE NEW ARTIST
      </button>
      <h2 className="text-sm font-bold mb-1">
        PLEASE, SELECT AN ARTIST TO ACTIVATE...
      </h2>
      <div className="gap-1 flex flex-col items-start max-h-[250px] md:max-h-[500px] overflow-y-auto">
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
