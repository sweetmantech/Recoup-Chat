import { inProcessImplementationAbi } from "@/abi/inProcessImplementationAbi";
import { encodeFunctionData, maxUint256 } from "viem";

export const getSetupNewTokenCall = ({
  uri = "ar://",
  maxSupply = maxUint256,
}: {
  uri?: string;
  maxSupply?: bigint;
}) =>
  encodeFunctionData({
    abi: inProcessImplementationAbi,
    functionName: "setupNewToken",
    args: [uri, maxSupply],
  });
