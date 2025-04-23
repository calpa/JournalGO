import { createFileRoute } from "@tanstack/react-router";
import { usePrivy } from "@privy-io/react-auth";
import { useReadContract } from "wagmi";
import JournalGOABI from "../../abi/JournalGO.json";
import { Link } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";

export const Route = createFileRoute("/entry/")({
  component: EntryList,
});

function EntryList() {
  const { user } = usePrivy();
  const { data: entryCount, isLoading } = useReadContract({
    abi: JournalGOABI.abi,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    functionName: "getEntryCount",
    args: [user?.wallet?.address],
    query: {
      enabled: !!user?.wallet?.address,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title="日記列表" />
      <main className="container mx-auto px-4 py-8">
        {isLoading || !entryCount ? (
          <div className="text-center text-lg font-medium text-gray-600">
            正在載入日記...
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              日記總數: {entryCount?.toString()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: Number(entryCount?.toString() || 0) }).map(
                (_, index) => (
                  <Link
                    key={index}
                    to="/entry/$entryId"
                    params={{ entryId: index.toString() }}
                    className="block text-center px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    查看日記 {index + 1}
                  </Link>
                )
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
