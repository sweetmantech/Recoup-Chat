import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_EVENT,
  MESSAGE_SENT_POINT,
} from "../consts";
import { StackMessage } from "@/types/Stack";

const trackNewMessage = async (
  address: Address,
  message: StackMessage,
  accountId: string,
  conversationId: string,
  referenceId?: string,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = message.id;
    const eventName = `${MESSAGE_SENT_EVENT}-${conversationId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata: {
        ...message,
        conversationId,
        referenceId: referenceId || "",
        accountId,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default trackNewMessage;
