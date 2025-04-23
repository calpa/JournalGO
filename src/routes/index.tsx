import { createFileRoute } from "@tanstack/react-router";
import { usePrivy } from "@privy-io/react-auth";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { ready, authenticated, user, login } = usePrivy();

  if (!ready) {
    return null;
  }

  if (user?.wallet?.address) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 dark:text-blue-500">
        秘密日記
      </h1>
      {authenticated ? (
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            歡迎，{user?.email?.address || user?.wallet?.address}
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            前往儀表板
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            請登錄以訪問您的日記
          </p>
          <button
            onClick={login}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            登錄
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
