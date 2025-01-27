import useActionApprove from "@/hooks/useActionApprove";
import { useAutopilotProvider } from "@/providers/AutopilotProvider";
import { ACTION } from "@/types/Autopilot";
import { Check, Play, Trash2 } from "lucide-react";

const ActionBox = ({ action, index }: { action: ACTION; index: number }) => {
  const { handleClick, copied } = useActionApprove();
  const { deny } = useAutopilotProvider();

  return (
    <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center font-inter_bold">
      <div className="flex gap-2 items-center">
        <p>
          <span>{`> `}</span>
          {action.title}
        </p>{" "}
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <button
          className="border rounded-md py-1 px-2 flex gap-1 items-center"
          onClick={() => handleClick(action)}
        >
          {copied ? (
            <>
              <Check className="size-4" /> Copied
            </>
          ) : (
            <>
              <Play className="size-4" /> Continue
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
