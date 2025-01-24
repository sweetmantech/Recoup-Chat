import { STEP_OF_ANALYSIS } from "@/types/Funnel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFinishedScraping = (thoughts: any) => {
  return Object.entries(thoughts)
    .filter(
      // eslint-disable-next-line
      ([id, value]: any) => id !== "wrapped",
    )
    .every(
      // eslint-disable-next-line
      ([id, value]: any) =>
        value.status === STEP_OF_ANALYSIS.FINISHED ||
        value.status === STEP_OF_ANALYSIS.ERROR,
    );
};

export default isFinishedScraping;
