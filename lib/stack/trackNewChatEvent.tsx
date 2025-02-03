import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_EVENT,
  MESSAGE_SENT_POINT,
  NEW_CHAT_EVENT,
} from "../consts";

const trackNewChatEvent = async (
  address: Address,
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    await stackClient.track(`${NEW_CHAT_EVENT}-${address}`, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata,
    });
    await stackClient.track(
      `${MESSAGE_SENT_EVENT}-${metadata.conversationId}`,
      {
        points: MESSAGE_SENT_POINT,
        account: address,
        uniqueId,
        metadata,
      },
    );
  } catch (error) {
    return { error };
  }
};

export default trackNewChatEvent;
