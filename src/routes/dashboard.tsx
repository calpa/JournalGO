import { createFileRoute } from "@tanstack/react-router";
import { usePrivy } from "@privy-io/react-auth";
import { EmotionForm } from "../components/EmotionForm";
import { buildbear } from "../providers/config";
import { useReadContract } from "wagmi";
import JournalGOABI from "../abi/JournalGO.json";
import { Link } from "@tanstack/react-router";
import { deriveAESKeyFromSignature } from "../functions/deriveAESKeyFromSignature";
import { encryptText } from "../functions/encryptText";
import { decryptText } from "../functions/decryptText";
import { useSignTypedData } from "@privy-io/react-auth";
import { useState } from "react";
import { Navbar } from "../components/Navbar";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, logout, login } = usePrivy();
  const { signTypedData } = useSignTypedData();

  // Signature
  // Cypher
  // iv
  const [signature, setSignature] = useState<string | null>(null);
  const [cipher, setCipher] = useState<string | null>(null);
  const [iv, setIv] = useState<string | null>(null);
  const [key, setKey] = useState<CryptoKey | null>(null);

  const { data: entryCount } = useReadContract({
    abi: JournalGOABI.abi,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    functionName: "getEntryCount",
    args: [user?.wallet?.address],
    query: {
      enabled: !!user?.wallet?.address,
    },
  });

  async function handleClick() {
    console.log("開始加密/解密過程...");
    const { signature } = await signTypedData({
      domain: {
        name: "JournalGO",
        version: "1",
      },
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
        ],
      },
      primaryType: "EIP712Domain",
      message: {
        name: "JournalGO",
        version: "1",
      },
    });
    console.log("獲得簽名:", signature);

    const key = await deriveAESKeyFromSignature(signature);
    console.log("從簽名派生的AES密鑰");

    const plaintext = "今天心情不錯";
    console.log("原始文本:", plaintext);

    const { cipher, iv } = await encryptText(plaintext, key);
    console.log("加密後的密文:", cipher);
    console.log("初始化向量:", iv);

    const decrypted = await decryptText(cipher, iv, key);
    console.log("解密後的文本:", decrypted);

    console.log("解密成功:", plaintext === decrypted);

    setSignature(signature);
    setCipher(cipher);
    setIv(iv);
    setKey(key);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title="Dashboard" />
      <main className="container mx-auto px-4 py-4 grid gap-4">
        <div>Number of Entries: {entryCount?.toString()}</div>

        <div className="mt-4 gap-4 grid grid-cols-3">
          {Array.from({ length: Number(entryCount?.toString() || 0) }).map(
            (_, index) => (
              <Link
                key={index}
                to="/entry/$entryId"
                params={{ entryId: index.toString() }}
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium"
              >
                View Entry {index + 1}
              </Link>
            )
          )}
        </div>

        {/* Show current blockchain network */}
        <div className="text-gray-600 text-sm">
          Current network: {buildbear.name} ({buildbear.id})
        </div>

        <EmotionForm />
      </main>
    </div>
  );
}
