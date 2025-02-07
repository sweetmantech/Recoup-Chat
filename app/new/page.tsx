"use client";

import InitialChat from "@/components/Chat/InitialChat";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatProvider } from "@/providers/ChatProvider";

const NewChatPage = () => {
  const { isLoading } = useChatProvider();

  if (isLoading)
    return (
      <div className="size-full py-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <Skeleton className="w-1/4 h-14 self-end" />
          <Skeleton className="w-1/2 h-20 self-start" />
          <Skeleton className="w-3/4 h-14 self-end" />
          <Skeleton className="w-3/4 h-24 self-start" />
        </div>
      </div>
    );
  return <InitialChat />;
};

export default NewChatPage;
