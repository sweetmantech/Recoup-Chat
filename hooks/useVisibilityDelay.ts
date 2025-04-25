import { useState, useEffect } from "react";

type UseVisibilityDelayOptions = {
  /**
   * Whether the conditions for showing content are met
   */
  shouldBeVisible: boolean;

  /**
   * Delay in milliseconds before showing content
   * @default 300
   */
  delay?: number;

  /**
   * Dependencies to watch for changes
   * @default []
   */
  deps?: ReadonlyArray<unknown>;
};

/**
 * Hook to handle delayed visibility transitions
 *
 * @example
 * const { isVisible } = useVisibilityDelay({
 *   shouldBeVisible: !!userData && !!artistData,
 *   deps: [userData?.name, artistData?.name]
 * });
 */
export function useVisibilityDelay({
  shouldBeVisible,
  delay = 300,
  deps = [],
}: UseVisibilityDelayOptions) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Debug logs to understand visibility
  console.log("[useVisibilityDelay] Input:", { 
    shouldBeVisible, 
    currentVisibility: isVisible,
    depsLength: deps.length,
    depsFirstItem: deps.length > 0 ? deps[0] : null 
  });

  useEffect(() => {
    // Only proceed if conditions are met
    if (!shouldBeVisible) {
      console.log("[useVisibilityDelay] Setting visibility to FALSE");
      setIsVisible(false);
      return;
    }

    // Add delay for smoother transition
    console.log("[useVisibilityDelay] Setting timer to show content in", delay, "ms");
    const timer = setTimeout(() => {
      console.log("[useVisibilityDelay] Timer fired - setting visibility to TRUE");
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBeVisible, delay, ...deps]);

  return { isVisible };
}

export default useVisibilityDelay;
