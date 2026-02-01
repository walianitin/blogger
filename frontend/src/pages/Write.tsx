import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
interface BlogPost {
    title: string;
    content: string;
}

const backend_url = "https://worker-name.walianitin406.workers.dev"

export default function Write() {
    const [blogPost, setBlogPost] = useState<BlogPost>({
        title: "",
        content: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return token ? token : '';
    };

    // Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);

    // Auto-resize textarea function
    const autoResize = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
        }
    }

    // Auto-resize on content change
    useEffect(() => {
        autoResize()
    }, [blogPost.content])

    const handleSubmit = async () => {
        // Prevent double submission
        if (isSubmitting || isLoading) {
            return
        }

        if (!blogPost.title.trim() || !blogPost.content.trim()) {
            alert("Please fill in both title and content")
            return
        }

        setIsSubmitting(true)
        setIsLoading(true)
        try {
            const authHeader = getAuthHeader();
            const response = await axios.post(`${backend_url}/api/v1/blog/post`, blogPost, {
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json"
                }
            })
          
            
            if (response.status === 200 || response.status === 201) {
                alert("Blog post created successfully!")
                setBlogPost({ title: "", content: "" }) // Clear form
                navigate("/explore")
            }
        } catch (error) {
            console.error("Error creating blog post:", error)
            alert("Failed to create blog post. Please try again.")
        } finally {
            setIsLoading(false)
            setIsSubmitting(false)
        }
    }

    return (
      <>
        <Header token={getAuthHeader() as string} />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 px-4 py-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">
                New story
              </h1>
              <p className="mt-1 text-slate-600">Share your thoughts with the world</p>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Title"
                value={blogPost.title}
                onChange={(e) =>
                  setBlogPost((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border-0 bg-transparent py-3 font-display text-2xl font-bold text-slate-900 outline-none placeholder:text-slate-400 sm:text-3xl"
              />
            </div>

            <div className="mb-10">
              <textarea
                ref={textareaRef}
                placeholder="Tell your story..."
                value={blogPost.content}
                onChange={(e) => {
                  setBlogPost((prev) => ({ ...prev, content: e.target.value }));
                  autoResize();
                }}
                className="min-h-[200px] w-full resize-none border-0 bg-transparent py-3 text-lg text-slate-700 outline-none placeholder:text-slate-400 leading-relaxed"
                rows={1}
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-full bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  isSubmitting ||
                  !blogPost.title.trim() ||
                  !blogPost.content.trim()
                }
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  isLoading ||
                  isSubmitting ||
                  !blogPost.title.trim() ||
                  !blogPost.content.trim()
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading || isSubmitting ? "Publishing…" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
}