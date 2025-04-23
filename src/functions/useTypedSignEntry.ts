import { useSignTypedData } from "@privy-io/react-auth";
import { Address } from "viem";

/**
 * Generate EIP-712 domain for JournalGO
 * @param {number} chainId - The chain ID of the network
 * @returns {Object} The EIP-712 domain
 */
const generateDomain = (chainId: number) => {
  return {
    name: "JournalGO",
    version: "1",
    chainId,
    verifyingContract: import.meta.env.VITE_CONTRACT_ADDRESS,
  };
};

/**
 * EIP-712 types for Entry
 */
const types = {
  Entry: [{ name: "timestamp", type: "uint256" }],
};

/**
 * Hook for signing typed data for JournalGO entries
 * @param {Address} address - The address of the signer
 * @returns {{signEntry: function, address: Address}} An object containing the signEntry function and the signer's address
 */
export function useTypedSignEntry(address: Address, chainId: number) {
  const { signTypedData } = useSignTypedData();

  /**
   * Signs an entry using EIP-712 typed data
   * @param {Object} entry - The entry to be signed
   * @param {number} entry.timestamp - The timestamp of the entry
   * @returns {Promise<string>} A promise that resolves to the signature
   */
  const signEntry = async (entry: { timestamp: number }): Promise<string> => {
    const { signature } = await signTypedData({
      domain: generateDomain(chainId),
      types,
      primaryType: "Entry",
      message: {
        timestamp: entry.timestamp,
      },
    });
    return signature;
  };

  return { signEntry, address };
}
