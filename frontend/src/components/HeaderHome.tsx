import { useNavigate } from "react-router-dom";

export default function HeaderHome() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <span className="font-display text-lg font-bold text-white">B</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-800">
            Blogger
          </span>
        </button>

        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}