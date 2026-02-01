import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backedn.walianitin406.workers.dev/api/v1/user/signup",
        data
      );
      const token = response.data.jwt || response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        alert("Signup successful but no token received");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
        <div className="px-8 py-8">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
              <span className="font-display text-2xl font-bold text-white">B</span>
            </div>
          </div>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-slate-800">
            Create account
          </h1>
          <p className="mt-1 text-center text-slate-600">Join us today</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Full name"
                aria-label="Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                type="password"
                placeholder="Password"
                aria-label="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg"
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-5 text-center">
          <span className="text-sm text-slate-600">Already have an account? </span>
          <Link
            to="/signin"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}