import { createFileRoute } from "@tanstack/react-router";
import { useSignTypedData } from "@privy-io/react-auth";
import { useState } from "react";
import { handleEncrypt } from "../functions/handleEncrypt";
import { Navbar } from "../components/Navbar";
import SubmitEntryButton from "../components/SubmitJournalButton";

export const Route = createFileRoute("/encrypt")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signTypedData } = useSignTypedData();
  const [plaintext, setPlaintext] = useState<string>("");
  const [cipher, setCipher] = useState<string | null>(null);
  const [iv, setIv] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { cipher, iv } = await handleEncrypt(signTypedData, plaintext);
    setCipher(cipher);
    setIv(iv);
  }

  return (
    <div className="">
      <Navbar title="Encrypt" />

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="plaintext"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter text to encrypt"
            rows={4}
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          ></textarea>

          <div className="flex justify-start gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!plaintext}
            >
              Encrypt
            </button>

            <SubmitEntryButton plaintext={plaintext} />
          </div>
        </form>
        {cipher && iv && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Encrypted Result:</h2>
            <div className="mb-2 break-words">
              <div>Cipher:</div>
              <div>{cipher}</div>
            </div>
            <div className="break-words">
              <div>IV:</div>
              <div>{iv}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
