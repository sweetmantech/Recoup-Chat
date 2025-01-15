import { useApprovalsProvider } from "@/providers/ApprovalsProvider";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { Pencil, Trash2 } from "lucide-react";

const ActionBox = ({ socialName }: { socialName: string }) => {
  const { selectedArtist, toggleSettingModal, toggleUpdate } =
    useArtistProvider();
  const { deny } = useApprovalsProvider();

  const handleClick = () => {
    if (selectedArtist) {
      toggleUpdate(selectedArtist);
      toggleSettingModal();
    }
  };

  return (
    <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center font-inter_bold">
      <div className="flex gap-2 items-center">
        <p>
          <span>{`> `}</span>
          {socialName}:
        </p>{" "}
        <p>{selectedArtist?.name}</p>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <button
          className="border rounded-md py-1 px-2 flex gap-1 items-center"
          onClick={handleClick}
        >
          <Pencil className="size-4" /> Approve
        </button>
        <button
          className="border rounded-md py-1 px-2 flex gap-1 items-center"
          onClick={() => deny(socialName)}
        >
          <Trash2 className="size-4" /> Deny
        </button>
      </div>
    </div>
  );
};

export default ActionBox;
