import { useArtistProvider } from "@/providers/ArtistProvider";
import { Terminal } from "lucide-react";

const Approvals = () => {
  const { selectedArtist, toggleCreation } = useArtistProvider();

  return (
    <div className="border border-green-700 p-2 rounded-md flex flex-col grow">
      <div className="flex items-center gap-2 pb-1 border-b border-green-900">
        <Terminal className="h-5 w-5" />
        <h1 className="text-md font-bold">{selectedArtist?.name}</h1>
        <div className="ml-auto flex gap-2">
          <div className="size-2 rounded-full bg-red-500" />
          <div className="size-2 rounded-full bg-yellow-500" />
          <div className="size-2 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="flex items-end gap-2 text-xs grow">
        <button
          className="border border-green-700 px-2 py-1 rounded-md"
          onClick={() => window.open(`${location.origin}/`)}
        >
          + New Chat
        </button>
        <button
          className="border border-green-700 px-2 py-1 rounded-md"
          onClick={() => window.open(`${location.origin}/funnels/wrapped`)}
        >
          + New Agent
        </button>
        <button
          className="border border-green-700 px-2 py-1 rounded-md"
          onClick={toggleCreation}
        >
          + Add Artist
        </button>
      </div>
    </div>
  );
};

export default Approvals;
