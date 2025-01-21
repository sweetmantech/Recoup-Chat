import { ACTIONS } from "@/hooks/useAutopilot";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useAutopilotProvider } from "@/providers/AutoPilotProvider";
import { Pencil, Trash2 } from "lucide-react";

const ActionBox = ({
  actionLabel,
  actionValue,
  index,
}: {
  actionLabel: string;
  actionValue: number;
  index: number;
}) => {
  const { selectedArtist, toggleSettingModal, toggleUpdate } =
    useArtistProvider();
  const { deny, comments } = useAutopilotProvider();

  const handleClick = () => {
    if (actionValue === ACTIONS.SOCIAL && selectedArtist) {
      toggleUpdate(selectedArtist);
      toggleSettingModal();
    }
    if (actionValue === ACTIONS.POST_REACTION) {
      navigator.clipboard.writeText(comments?.[0]?.comment || "");
    }
  };

  return (
    <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center font-inter_bold">
      <div className="flex gap-2 items-center">
        <p>
          <span>{`> `}</span>
          {actionLabel}
        </p>{" "}
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
          onClick={() => deny(index)}
        >
          <Trash2 className="size-4" /> Deny
        </button>
      </div>
    </div>
  );
};

export default ActionBox;
