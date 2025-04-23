import { SignTypedDataParams } from "@privy-io/react-auth";
import { buildbear } from "../providers/config";

export const inputObject: SignTypedDataParams = {
  domain: {
    name: "JournalGO",
    version: "1",
    chainId: buildbear.id,
    verifyingContract: import.meta.env.VITE_CONTRACT_ADDRESS,
  },
  types: {
    EIP712Domain: [
      { name: "name", type: "string" }, // Dapp Name
      { name: "version", type: "string" }, // Dapp Version
      { name: "chainId", type: "uint256" }, // Dapp Chain ID
      { name: "verifyingContract", type: "address" }, // Dapp Contract Address
    ],
  },
  primaryType: "EIP712Domain",
  message: {
    name: "謝謝你讓我佔用你寶貴的時間",
  },
};
