import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_EVENT,
  MESSAGE_SENT_POINT,
} from "../consts";

const trackChatTitle = async (
  address: Address,
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any,
  conversationId: string,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    const eventName = `${MESSAGE_SENT_EVENT}-${conversationId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata: {
        ...metadata,
        conversationId: conversationId,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default trackChatTitle;
