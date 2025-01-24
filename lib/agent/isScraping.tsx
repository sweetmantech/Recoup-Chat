import { STEP_OF_ANALYSIS } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isScraping = (thoughts: any) => {
  return (
    thoughts &&
    Object.values(thoughts).some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => value.status > STEP_OF_ANALYSIS.UNKNOWN_PROFILE,
    )
  );
};

export default isScraping;
