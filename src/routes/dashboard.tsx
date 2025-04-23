import { createFileRoute } from "@tanstack/react-router";
import { usePrivy } from "@privy-io/react-auth";
import { EmotionForm } from "../components/EmotionForm";
import { Link } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = usePrivy();

  if (!user?.wallet?.address) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar title="儀表板" />
      <main className="container mx-auto px-4 py-4 grid gap-4">
        <EmotionForm />

        <Link
          to="/entry"
          className="inline-block w-36 mx-auto text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium"
        >
          瀏覽私密筆記
        </Link>
      </main>
    </div>
  );
}
