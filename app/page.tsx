"use client";

import AIError from "@/components/Chat/AIError";
import InitialChat from "@/components/Chat/InitialChat";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";

const LandingPage = () => {
  const { quotaExceeded } = useConversationsProvider();
  return <>{quotaExceeded ? <AIError /> : <InitialChat />}</>;
};

export default LandingPage;
