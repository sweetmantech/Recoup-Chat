import { Conversation } from "@/types/Stack";

const getActivities = (conversations: Array<Conversation>) => {
  const funnelAnalyses = conversations.filter(
    (conversation: Conversation) =>
      conversation?.metadata?.conversationId &&
      conversation?.metadata?.is_funnel_analysis,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activities = funnelAnalyses.reduce((acc: any, item: any) => {
    const date = new Date(item.timestamp);
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingEntry: any = acc.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (entry: any) => entry.date === formattedDate,
    );
    if (existingEntry) {
      existingEntry.count++;
    } else {
      acc.push({ date: formattedDate, count: 1 });
    }
    return acc;
  }, []);

  return activities;
};

export default getActivities;
