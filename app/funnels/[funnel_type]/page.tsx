"use client";

import FunnelAccountInput from "@/components/Funnels/FunnelAccountInput";
import VerifyingSocials from "@/components/Funnels/VerifyingSocials";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const FunnelPage = () => {
  const { isCheckingHandles } = useFunnelAnalysisProvider();

  return (
    <>{isCheckingHandles ? <VerifyingSocials /> : <FunnelAccountInput />}</>
  );
};

export default FunnelPage;
