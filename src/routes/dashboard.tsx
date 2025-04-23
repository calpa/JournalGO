import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { EmotionForm } from "../components/EmotionForm";
import { Link, Navigate } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { useChainId, useBalance } from "wagmi";
import { optimismSepolia, sepolia } from "viem/chains";
import { buildbear } from "../providers/config";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = usePrivy();
  const chainId = useChainId();
  const { wallets } = useWallets();
  const { data: balance } = useBalance({
    address: user?.wallet?.address as `0x${string}`,
  });

  if (!user?.wallet?.address) {
    return <Navigate to="/" />;
  }

  const contract_address =
    chainId === optimismSepolia.id
      ? import.meta.env.VITE_OPTIMISM_SEPOLIA_CONTRACT_ADDRESS
      : import.meta.env.VITE_BUILDBEAR_CONTRACT_ADDRESS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title="儀表板" />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">情緒日記</h2>
            <EmotionForm />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">用戶資訊</h2>
            <div>Chain: {chainId}</div>
            <p className="mb-4">
              你的地址是{" "}
              <span className="font-mono text-sm bg-gray-100 p-1 rounded break-all">
                {user?.wallet?.address}
              </span>
            </p>

            <p className="mb-4 break-all">合約地址：{contract_address}</p>
            <p className="mb-4">
              餘額: {balance?.formatted} {balance?.symbol}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                獲取免費的測試網絡以太幣：
                <a
                  href="https://faucet.buildbear.io/tense-hulk-76135f78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  BuildBear Faucet
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={async () => {
                  console.log(`Trying to switch to Buildbear`);
                  await wallets[0].switchChain(buildbear.id);
                }}
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium mb-4"
              >
                切換到 Buildbear
              </button>
              <button
                onClick={async () => {
                  console.log(`Trying to switch to Sepolia`);
                  await wallets[0].switchChain(sepolia.id);
                }}
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium mb-4"
              >
                切換到 Sepolia
              </button>
              <button
                onClick={async () => {
                  console.log(`Trying to switch to Optimism Sepolia`);
                  await wallets[0].switchChain(optimismSepolia.id);
                }}
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium mb-4"
              >
                切換到 Optimism Sepolia
              </button>

              <Link
                to="/entry"
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium"
              >
                瀏覽私密筆記
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
