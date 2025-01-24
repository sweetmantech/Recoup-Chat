import { STEP_OF_ANALYSIS } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInitialScraping = (thoughts: any) => {
  return (
    thoughts &&
    Object.values(thoughts).every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => value.status === STEP_OF_ANALYSIS.INITITAL,
    )
  );
};

export default isInitialScraping;
