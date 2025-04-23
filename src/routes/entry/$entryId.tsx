import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useReadContract } from "wagmi";
import JournalGOABI from "../../abi/JournalGO.json";
import { usePrivy, useSignTypedData } from "@privy-io/react-auth";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { handleDecrypt } from "../../functions/handleDecrypt";
import { Navbar } from "../../components/Navbar";

export const Route = createFileRoute("/entry/$entryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signTypedData } = useSignTypedData();

  const { entryId } = useParams({ from: "/entry/$entryId" });
  const { user } = usePrivy();

  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: entry, isLoading } = useReadContract({
    abi: JournalGOABI.abi,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    functionName: "getEntry",
    args: [user?.wallet?.address, BigInt(entryId)],
    query: {
      enabled: !!user?.wallet?.address && !!entryId,
    },
  });

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (!entry) {
      console.log("No entry found, aborting decryption");
      return;
    }

    const cipher = entry[0];
    const iv = entry[1];

    try {
      const text = await handleDecrypt(signTypedData, cipher, iv);
      setDecryptedText(text);
    } catch (err) {
      console.error("Decryption failed", err);
      setErrorMessage(
        "Unable to decrypt this journal entry. Please ensure you are the original creator."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title={`Entry ${Number(entryId) + 1}`} />

      <main className="container mx-auto px-4 py-8">
        <div className="container bg-white shadow-md rounded-lg p-6">
          <div className="">
            <h2 className="text-2xl font-bold mb-4">Entry Details</h2>
            {Boolean(entry) && (
              <div className="container mt-4 flex flex-col gap-4">
                <div className="break-words">Cypher: {entry[0]}</div>
                <div className="break-words">IV: {entry[1]}</div>
                <div className="break-words">Timestamp: {entry[2]}</div>
                <div>{decryptedText}</div>

                {!decryptedText && (
                  <button
                    onClick={handleClick}
                    className="mt-4 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition w-36"
                  >
                    Decrypt
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
