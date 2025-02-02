import { STEP_OF_AGENT } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isScraping = (agentsStatus: any) => {
  return agentsStatus.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (agentStatus: any) => agentStatus.status > STEP_OF_AGENT.UNKNOWN_PROFILE,
  );
};

export default isScraping;
