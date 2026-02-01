import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";

interface ContentProps {
  url: string;
  author: string;
  title: string;
  content: string;
  isSignedIn?: boolean;
}

export default function Content({ url, author, title, content, isSignedIn = true }: ContentProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const safeData = {
    url: url || "",
    author: author || "Unknown Author",
    title: title || "Untitled",
    content: content || "No content available",
  };

  const previewLength = 180;
  const showExpand = safeData.content.length > previewLength;

  const handleReadMore = () => {
    if (!isSignedIn) {
      navigate("/signin");
      return;
    }
    setExpanded(!expanded);
  };

  // Guest view: blurred/faded content with one centered "Read more" button
  if (!isSignedIn) {
    return (
      <article className="p-6">
        <HeroSection Avatar_url={safeData.url} author_name={safeData.author} />
        <div className="mt-5 border-t border-slate-100 pt-4">
          <h2 className="font-display text-xl font-bold text-slate-900 leading-snug">
            {safeData.title}
          </h2>
          <div className="relative mt-3 max-h-32 overflow-hidden">
            <p className="text-slate-600 leading-relaxed blur-[2px] select-none">
              {safeData.content}
            </p>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white"
              aria-hidden
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-md hover:shadow-lg"
            >
              Read more
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="p-6">
      <HeroSection Avatar_url={safeData.url} author_name={safeData.author} />
      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <h2 className="font-display text-xl font-bold text-slate-900 leading-snug">
          {safeData.title}
        </h2>
        <p className="text-slate-600 leading-relaxed">
          {expanded ? safeData.content : safeData.content.slice(0, previewLength)}
          {!expanded && showExpand && "… "}
          {showExpand && (
            <button
              type="button"
              onClick={handleReadMore}
              className="ml-1 font-medium text-blue-600 hover:text-blue-700"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>
    </article>
  );
}