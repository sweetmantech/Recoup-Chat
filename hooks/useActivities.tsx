import getActivities from "@/lib/getActivities";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";

const useActivities = () => {
  const { allConverstaions } = useConversationsProvider();
  const activities = getActivities(allConverstaions);
  return {
    activities,
  };
};

export default useActivities;
