import { Terminal } from "lucide-react";
import ActionBox from "./ActionBox";
import { useAutopilotProvider } from "@/providers/AutopilotProvider";
import useCredits from "@/hooks/useCredits";
import { ACTION } from "@/types/Autopilot";
import { Skeleton } from "../ui/skeleton";

const Approvals = () => {
  useCredits();
  const { actions } = useAutopilotProvider();
  return (
    <div className="border p-2 rounded-md flex flex-col grow">
      <div className="flex items-center gap-2 pb-1 border-b">
        <Terminal className="h-5 w-5" />
        <h1 className="text-sm font-inter_bold">WAITING FOR REVIEW</h1>
      </div>
      <div className="grow pt-4 px-2 space-y-1 text-xs">
        {actions.map((action: ACTION, i: number) => (
          <ActionBox action={action} key={i} index={i} />
        ))}
        {actions.length < 3 &&
          Array.from({ length: 3 - actions.length }).map((_, i) => (
            <Skeleton className="w-full h-10" key={i} />
          ))}
      </div>
    </div>
  );
};

export default Approvals;
