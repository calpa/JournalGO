import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useReadContract } from "wagmi";
import JournalGOABI from "../../abi/JournalGO.json";
import { usePrivy, useSignTypedData } from "@privy-io/react-auth";
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

  const { data: entry, isLoading } = useReadContract({
    abi: JournalGOABI.abi,
    address: import.meta.env.VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS,
    functionName: "getEntry",
    args: [user?.wallet?.address, BigInt(entryId)],
    query: {
      enabled: !!user?.wallet?.address && !!entryId,
    },
  });

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    if (!entry) {
      console.log("未找到條目，中止解密");
      return;
    }

    const cipher = entry[0];
    const iv = entry[1];
    const timestamp = Number(entry[2]);

    if (!cipher || !iv || !timestamp) {
      console.error("Invalid entry data");
      return;
    }

    if (!user?.wallet?.address) {
      console.error("User address not found");
      return;
    }

    try {
      const text = await handleDecrypt(
        signTypedData,
        user?.wallet?.address,
        timestamp,
        cipher,
        iv
      );
      setDecryptedText(text);
    } catch (err) {
      console.error("解密失敗", err);
      setErrorMessage("無法解密此日記條目。請確保您是原始創建者。");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title={`條目 ${Number(entryId) + 1}`} />

      <main className="container mx-auto px-4 py-8">
        <div className="container bg-white shadow-md rounded-lg p-6">
          <div className="">
            <h2 className="text-2xl font-bold mb-4">您的筆記</h2>
            {Boolean(entry) && (
              <div className="container mt-4 flex flex-col gap-4">
                <div>{decryptedText}</div>

                {!decryptedText && (
                  <button
                    onClick={handleClick}
                    className="mt-4 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition w-36"
                  >
                    解密
                  </button>
                )}

                <div className="bg-gray-100 rounded-lg p-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">元數據</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="break-all">
                      <span className="font-medium">密文：</span>{" "}
                      <div>{(entry as [string, string, number])[0]}</div>
                    </div>
                    <div className="break-all">
                      <span className="font-medium">初始化向量：</span>{" "}
                      <div>{(entry as [string, string, number])[1]}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
