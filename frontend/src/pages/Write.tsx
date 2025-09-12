import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
interface BlogPost {
    title: string;
    content: string;
}

const backend_url = "https://backedn.walianitin406.workers.dev"

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

    return (<>
             <Header token={getAuthHeader() as string}></Header>
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-100 to-white px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white-200 bg-transparent  opacity-90 items-center justify-center mt-20 rounded-md p-10 border-2 border-r-3 border-blue-200 ">
               
                <div className="mb-4">
                    <h1 className="text-3xl font-thin text-gray-900 mb-2">
                          New Story</h1>
                    <p className="text-gray-600 font-extralight">Share your thoughts with the world</p>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={blogPost.title}
                        onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full text-4xl font-bold placeholder-gray-400 bg-transparent border-none outline-none resize-none py-4 text-gray-900"
                        style={{ border: 'none', boxShadow: 'none' }}
                        />
                </div>

                {/* Content Textarea - Auto-expanding */}
                <div className="mb-8">
                    <textarea
                        ref={textareaRef}
                        placeholder="Tell your story..."
                        value={blogPost.content}
                        onChange={(e) => {
                            setBlogPost(prev => ({ ...prev, content: e.target.value }))
                            autoResize()
                        }}
                        className="w-full text-lg placeholder-gray-400 bg-transparent border-none outline-none resize-none py-4 text-gray-700 leading-relaxed overflow-hidden"
                        style={{ 
                            border: 'none', 
                            boxShadow: 'none',
                            minHeight: '200px',
                            height: 'auto'
                        }}
                        rows={1}
                        />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 text-gray-200 bg-[#3f3f46] rounded-full transition-colors duration-200"
                        >
                        Cancel
                    </button>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || isSubmitting || !blogPost.title.trim() || !blogPost.content.trim()}
                        className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                            isLoading || isSubmitting || !blogPost.title.trim() || !blogPost.content.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg'
                        }`}
                        >
                        {isLoading || isSubmitting ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
                        </>
    )
}