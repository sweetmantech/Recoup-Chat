import { useEffect } from "react";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import CompletedAnalysis from "./CompletedAnalysis";

const Completion = () => {
  const { result, agent } = useFunnelAnalysisProvider();
  const { getPrompts } = usePromptsProvider();

  useEffect(() => {
    if (result) getPrompts(JSON.stringify(agent), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return <CompletedAnalysis />;
};

export default Completion;
