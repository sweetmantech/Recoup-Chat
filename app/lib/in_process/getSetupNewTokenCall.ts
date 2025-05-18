import { inProcessImplementationAbi } from "@/abi/inProcessImplementationAbi";
import { encodeFunctionData } from "viem";

export const getSetupNewTokenCall = (uri: string, maxSupply: bigint) =>
  encodeFunctionData({
    abi: inProcessImplementationAbi,
    functionName: "setupNewToken",
    args: [uri, maxSupply],
  });
