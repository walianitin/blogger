import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { FaUser, FaBell, FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Header({ token }: { token: string }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const isLoggedIn = token !== undefined && token.length > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <span className="font-display text-base font-bold text-white">B</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-800">
            Blogger
          </span>
        </button>

        <div className="hidden flex-1 max-w-md justify-center md:flex">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search stories..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
            >
              Sign in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/write")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
            >
              <TfiWrite size={14} />
              <span className="hidden sm:inline">Write</span>
            </button>
          )}

          <button
            type="button"
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <FaBell size={16} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <FaUser size={12} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">Your account</p>
                  <p className="text-xs text-slate-500">Manage your profile</p>
                </div>
                <button
                  type="button"
                  onClick={() => { navigate("/profile"); setIsProfileOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <FaUser size={14} />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => { navigate("/"); setIsProfileOpen(false); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <FaCog size={14} />
                  Settings
                </button>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt size={14} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4 mb-2 md:hidden">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          />
        </div>
      </div>
    </header>
  );
}