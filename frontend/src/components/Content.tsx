import { useState } from "react";
import Herosection from "./HeroSection";

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
        content: data?.content || "No content available"
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
            <Herosection Avatar_url={safeData.url} author_name={safeData.author} />
            <div className="mt-4 space-y-3">
                <h1 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200">
                    {safeData.title}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    {expanded ? safeData.content : (
                        safeData.content.length > 150
                            ? <>
                                {safeData.content.substring(0, 150)}...
                                <button
                                    className="text-blue-500 ml-2 underline"
                                    onClick={() => setExpanded(true)}
                                >
                                    Read more
                                </button>
                              </>
                            : safeData.content
                    )}
                </p>
                {expanded && (
                    <button
                        className="text-blue-500 mt-2 underline"
                        onClick={() => setExpanded(false)}
                    >
                        Show less
                    </button>
                )}
                {/* ...existing buttons... */}
            </div>
        </div>
    );
}