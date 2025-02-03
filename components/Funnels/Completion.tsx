import { useEffect } from "react";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import CompletedAnalysis from "./CompletedAnalysis";
import Error from "./Error";

const Completion = () => {
  const { agent, hasError } = useFunnelAnalysisProvider();
  const { getPrompts } = usePromptsProvider();

  useEffect(() => {
    if (agent) getPrompts(JSON.stringify(agent), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent]);

  return (
    <>
      {hasError ? <Error status={hasError?.status} /> : <CompletedAnalysis />}
    </>
  );
};

export default Completion;
