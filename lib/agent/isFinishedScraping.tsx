import { STEP_OF_AGENT } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFinishedScraping = (agentsStatus: any) => {
  return agentsStatus.every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (agentStatus: any) =>
      agentStatus.status === STEP_OF_AGENT.FINISHED ||
      agentStatus.status === STEP_OF_AGENT.ERROR,
  );
};

export default isFinishedScraping;
