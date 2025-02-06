import {
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_EVENT,
  MESSAGE_SENT_POINT,
  NEW_CHAT_EVENT,
} from "../consts";
import getStackClient from "./getStackClient";

const trackAgentChat = async (
  address: string | null,
  username: string,
  accountId: string,
  chatId: string,
  funnelName: string,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    await stackClient.track(`${MESSAGE_SENT_EVENT}-${chatId}`, {
      points: MESSAGE_SENT_POINT,
      account: address || "",
      uniqueId,
      metadata: {
        conversationId: chatId,
        accountId,
        title: `${funnelName.toUpperCase()} Analysis: ${username}`,
        is_funnel_analysis: true,
        funnel_name: funnelName,
      },
    });
    await stackClient.track(`${NEW_CHAT_EVENT}-${address}`, {
      points: MESSAGE_SENT_POINT,
      account: address || "",
      uniqueId,
      metadata: {
        conversationId: chatId,
        accountId,
        title: `${funnelName.toUpperCase()} Analysis: ${username}`,
        is_funnel_analysis: true,
        funnel_name: funnelName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default trackAgentChat;
