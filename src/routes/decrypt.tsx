import { createFileRoute } from "@tanstack/react-router";
import { useSignTypedData } from "@privy-io/react-auth";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { handleDecrypt } from "../functions/handleDecrypt";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";

export const Route = createFileRoute("/decrypt")({
  component: Decrypt,
});

function Decrypt() {
  const { user } = usePrivy();
  const { signTypedData } = useSignTypedData();
  const [cipher, setCipher] = useState<string>("");
  const [iv, setIv] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [timestamp, setTimestamp] = useState<number>(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const address = user?.wallet?.address as Address | null;
    if (!address) {
      return;
    }
    const text = await handleDecrypt(
      signTypedData,
      address,
      timestamp,
      cipher,
      iv
    );
    setDecryptedText(text);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title="Decrypt" />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={cipher}
              onChange={(e) => setCipher(e.target.value)}
              placeholder="Enter cipher"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={iv}
              onChange={(e) => setIv(e.target.value)}
              placeholder="Enter IV"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(Number(e.target.value))}
              placeholder="Enter timestamp"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 transition duration-300 ease-in-out"
            >
              Decrypt
            </button>
          </form>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Decrypted Text:</h2>
            <p className="bg-gray-100 p-4 rounded">
              {decryptedText || "No decrypted text"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
