import { useSendTransaction, useSignTypedData } from "@privy-io/react-auth";
import { abi } from "../abi/JournalGO.json";
import { useState } from "react";
import { encodeFunctionData } from "viem";
import { handleEncrypt } from "../functions/handleEncrypt";
import { useChainId } from "wagmi";
import { optimismSepolia } from "viem/chains";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";

interface Props {
  plaintext: string;
}

function SubmitJournalButton({ plaintext }: Props) {
  const { sendTransaction } = useSendTransaction();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signTypedData } = useSignTypedData();
  const { user } = usePrivy();
  const chainId = useChainId();

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      setErrorMessage("");

      const address = user?.wallet?.address as Address | null;
      if (!address) {
        return;
      }

      const encryptedData = await handleEncrypt(
        signTypedData,
        address,
        Math.floor(Date.now() / 1000),
        plaintext
      );

      if (!encryptedData.cipher || !encryptedData.iv) {
        throw new Error("Encryption failed");
      }

      console.log("Encrypted data:", encryptedData);

      // 4. Encode tx data
      const data = encodeFunctionData({
        abi,
        functionName: "recordEntry",
        args: [encryptedData.cipher, encryptedData.iv, encryptedData.timestamp],
      });

      console.log("Transaction data:", data);

      const contract_address =
        chainId === optimismSepolia.id
          ? import.meta.env.VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS
          : import.meta.env.VITE_BUILDBEAR_CONTRACT_ADDRESS;

      // 5. Send to blockchain
      await sendTransaction({
        to: contract_address,
        data,
      });
    } catch (err) {
      console.error("Failed to submit:", err);
      setErrorMessage((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        disabled={isPending || !plaintext}
        className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:opacity-50"
      >
        {isPending ? "上鏈中..." : "加密日誌並上鏈"}
      </button>
      {errorMessage && (
        <div className="text-red-500 mt-2 break-all">{errorMessage}</div>
      )}
    </div>
  );
}

export default SubmitJournalButton;
