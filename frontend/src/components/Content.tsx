import { useState } from "react";
import HeroSection from "./HeroSection";

interface Blog {
  url: string;
  author: string;
  title: string;
  content: string;
}

export default function Content(data: Blog) {
  const [expanded, setExpanded] = useState(false);
  const safeData = {
    url: data?.url || "",
    author: data?.author || "Unknown Author",
    title: data?.title || "Untitled",
    content: data?.content || "No content available",
  };

  const previewLength = 180;
  const showExpand = safeData.content.length > previewLength;

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
              onClick={() => setExpanded(!expanded)}
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