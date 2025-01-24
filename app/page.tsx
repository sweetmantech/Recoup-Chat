"use client";

import AutoPilot from "@/components/AutoPilot";
import { AutopilotProvider } from "@/providers/AutopilotProvider";

const AutoPilotPage = () => (
  <AutopilotProvider>
    <AutoPilot />
  </AutopilotProvider>
);

export default AutoPilotPage;
