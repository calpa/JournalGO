import { useSendTransaction, useSignTypedData } from "@privy-io/react-auth";
import { abi } from "../abi/JournalGO.json";
import { useState } from "react";
import { encodeFunctionData } from "viem";
import { handleEncrypt } from "../functions/handleEncrypt";

interface Props {
  plaintext: string;
}

function SubmitJournalButton({ plaintext }: Props) {
  const { sendTransaction } = useSendTransaction();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signTypedData } = useSignTypedData();

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      setErrorMessage("");

      const encryptedData = await handleEncrypt(signTypedData, plaintext);

      if (!encryptedData) {
        throw new Error("Encryption failed");
      }

      console.log("Encrypted data:", encryptedData);

      // 4. Encode tx data
      const data = encodeFunctionData({
        abi,
        functionName: "recordEntry",
        args: [encryptedData.cipher, encryptedData.iv],
      });

      console.log("Transaction data:", data);

      // 5. Send to blockchain
      await sendTransaction({
        to: import.meta.env.VITE_CONTRACT_ADDRESS,
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
