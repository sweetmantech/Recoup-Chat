import { STEP_OF_ANALYSIS } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isScraping = (thoughts: any) => {
  return (
    thoughts &&
    Object.entries(thoughts)
      // eslint-disable-next-line
      .filter(([id, value]: any) => id !== "wrapped")
      .some(
        // eslint-disable-next-line
        ([id, value]: any) => value.status > STEP_OF_ANALYSIS.UNKNOWN_PROFILE,
      )
  );
};

export default isScraping;
