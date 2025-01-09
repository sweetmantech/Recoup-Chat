import getActivities from "@/lib/getActivities";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";

const useActivities = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}/01/01`);
  const { allConverstaions } = useConversationsProvider();
  const activities = getActivities(allConverstaions);

  return {
    startDate,
    activities,
  };
};

export default useActivities;
