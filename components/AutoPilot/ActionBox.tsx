import useGenerateSegmentReport from "@/hooks/useGenerateSegmentReport";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useAutopilotProvider } from "@/providers/AutopilotProvider";
import { ACTIONS } from "@/types/Autopilot";
import { Check, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";
import instructions from "@/evals/scripts/instructions.json";

const ActionBox = ({
  actionLabel,
  actionValue,
  index,
}: {
  actionLabel: string;
  actionValue: number;
  index: number;
}) => {
  const { append } = useChatProvider();
  const { selectedArtist, toggleSettingModal, toggleUpdate } =
    useArtistProvider();
  const { deny, comments, segmentName, funnelType, reportId } =
    useAutopilotProvider();
  const [copied, setCopied] = useState(false);
  const { handleGenerateReport } = useGenerateSegmentReport();

  const handleClick = () => {
    if (actionValue === ACTIONS.SOCIAL && selectedArtist) {
      toggleUpdate(selectedArtist);
      toggleSettingModal();
    }
    if (actionValue === ACTIONS.POST_REACTION) {
      navigator.clipboard.writeText(comments?.[0]?.comment || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (actionValue === ACTIONS.REPORT) {
      handleGenerateReport(segmentName, funnelType || "", reportId || "");
    }
    if (actionValue === ACTIONS.CONTENT_CALENDAR) {
      append({
        id: uuidV4(),
        role: "user",
        content: instructions.content_calendar,
      });
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
          {copied ? (
            <>
              <Check className="size-4" /> Copied
            </>
          ) : (
            <>
              <Pencil className="size-4" /> Approve
            </>
          )}
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
