import { Skeleton } from "../ui/skeleton";

const AgentSkeleton = () => {
  return (
    <main className="grow py-2">
      <div className="px-4 md:max-w-3xl md:mx-auto md:w-full h-full md:pt-4 flex flex-col bg-white">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-8 w-2/4" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </main>
  );
};

export default AgentSkeleton;
