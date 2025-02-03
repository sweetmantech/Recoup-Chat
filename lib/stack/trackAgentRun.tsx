import { Address } from "viem";
import getStackClient from "./getStackClient";
import { AGENT_RUN, CHAT_POINT_SYSTEM_ID, MESSAGE_SENT_POINT } from "../consts";

const trackAgent = async (
  agentId: string,
  analysisId: string,
  address: Address,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    const eventName = `${AGENT_RUN}-${analysisId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata: {
        agentId,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default trackAgent;
