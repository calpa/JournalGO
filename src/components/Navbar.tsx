import { usePrivy } from "@privy-io/react-auth";
import { Link, useRouter } from "@tanstack/react-router";

interface Props {
  title: string;
}

export function Navbar(props: Props) {
  const { title } = props;
  const { user, logout, login } = usePrivy();
  const { state } = useRouter();

  return (
    <nav className="bg-gradient-to-r from-sky-600 to-blue-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {state.location.pathname !== "/dashboard" && (
            <Link
              to={"/dashboard"}
              className="text-white bg-sky-700 hover:bg-sky-800 px-3 py-1 rounded-md transition-colors duration-200 text-sm font-medium"
            >
              ← 返回
            </Link>
          )}
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
        <button
          onClick={user ? logout : login}
          className="bg-white text-sky-600 font-medium px-4 py-1.5 rounded-full hover:bg-sky-100 transition duration-200 ease-in-out text-sm"
        >
          {user ? "登出" : "登入"}
        </button>
      </div>
    </nav>
  );
}
