import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 sm:py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
        Human stories & ideas
      </h1>
      <p className="mt-4 max-w-xl text-center text-lg text-slate-600 sm:text-xl">
        A place to read, write, and deepen your understanding
      </p>
      <button
        type="button"
        onClick={() => navigate("/explore")}
        className="mt-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg"
      >
        Explore stories
      </button>
      <div className="mt-12 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-50/50 shadow-inner">
        <img
          src="/blogging.webp"
          alt=""
          className="w-full object-cover opacity-90 transition-opacity hover:opacity-100"
        />
      </div>
    </section>
  );
}   