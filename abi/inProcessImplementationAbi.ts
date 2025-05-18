export const inProcessImplementationAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
    ],
    name: "setupNewToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
