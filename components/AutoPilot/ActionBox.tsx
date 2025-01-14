import { useApprovalsProvider } from "@/providers/ApprovalsProvider";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { Pencil, Trash2 } from "lucide-react";

const ActionBox = ({ socialName }: { socialName: string }) => {
  const { selectedArtist, toggleSettingModal } = useArtistProvider();
  const { deny } = useApprovalsProvider();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <p>
          <span className="text-blue-400">{`> `}</span>
          {socialName}:
        </p>{" "}
        <p>Update {selectedArtist?.name}</p>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="border border-green-700 rounded-md py-1 px-2 flex gap-1 items-center"
          onClick={toggleSettingModal}
        >
          <Pencil className="size-4" /> Approve
        </button>
        <button
          className="border border-red-800 rounded-md py-1 px-2 text-red-800 flex gap-1 items-center"
          onClick={() => deny(socialName)}
        >
          <Trash2 className="size-4" /> Deny
        </button>
      </div>
    </div>
  );
};

export default ActionBox;
