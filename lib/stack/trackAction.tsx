import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  ACTION_EVENT,
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_POINT,
} from "../consts";
import { ACTION } from "@/types/Autopilot";

const trackAction = async (
  address: Address,
  action: ACTION,
  accountId: string,
  isApproved: boolean,
  // eslint-disable-next-line
  metadata: any,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    const eventName = `${ACTION_EVENT}-${accountId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata: {
        ...action,
        isApproved,
        ...metadata,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default trackAction;
