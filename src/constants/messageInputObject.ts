import { SignTypedDataParams } from "@privy-io/react-auth";
import { buildbear } from "../providers/config";
import { Address } from "viem";

/**
 * Generates an input object for signing typed data
 * @param {Address} user - The user's address
 * @param {number} timestamp - The timestamp of the entry
 * @returns {SignTypedDataParams} The input object for signing typed data
 */
export const generateInputObject = (
  user: Address,
  timestamp: number
): SignTypedDataParams => ({
  domain: {
    name: "JournalGO",
    version: "1",
    chainId: buildbear.id,
    verifyingContract: import.meta.env.VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS,
  },
  types: {
    EntryKey: [
      { name: "name", type: "string" },
      { name: "user", type: "address" },
      { name: "timestamp", type: "uint256" },
    ],
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
  },
  primaryType: "EntryKey",
  message: {
    name: "謝謝你讓我佔用你寶貴的時間",
    user,
    timestamp,
  },
});
