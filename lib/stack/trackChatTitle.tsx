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
  chatId: string,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    const eventName = `${MESSAGE_SENT_EVENT}-${chatId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata: {
        ...metadata,
        chatId,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default trackChatTitle;
