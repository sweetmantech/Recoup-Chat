"use client";

import AutoPilot from "@/components/AutoPilot";
import { ApprovalsProvider } from "@/providers/ApprovalsProvider";

const AutoPilotPage = () => (
  <ApprovalsProvider>
    <AutoPilot />
  </ApprovalsProvider>
);

export default AutoPilotPage;
