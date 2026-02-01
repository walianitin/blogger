import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import Header from '../components/Header';
import PostCardSkeleton from '../components/PostCardSkeleton';


interface Author {
    name: string;
}

interface Blog {
    key?: string;
    title: string;
    content: string;
    author: Author;
    url: string;
}

const backend_url = "https://backedn.walianitin406.workers.dev";

// Single long dummy post shown to guests when API returns no posts
const DUMMY_POSTS: Blog[] = [
  {
    title: "Why You Should Join Our Community",
    content: "Everyone has a story worth telling. Here you can discover ideas from writers around the world, save your favorite posts, and share your own. Sign in to read this full article and unlock all stories. Our community is built for readers and writers who want to learn and grow. Whether you are just starting out or have been writing for years, you will find a place here. Join thousands of members who publish every day and connect over shared interests. We cannot wait to hear what you have to say.",
    author: { name: "Blogger Team" },
    url: "",
  },
];

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return token ? `Bearer ${token}` : '';
    };

    useEffect(() => {
        // const token = localStorage.getItem('authToken');
        // if (!token) {
        //     navigate("/");
        //     return;
        // }

        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError('');
                const authHeader = getAuthHeader();
                const token = authHeader ? authHeader.split(" ")[1] : undefined;
                const response = await axios.get(`${backend_url}/api/v1/blog/bulk`, {
                    headers: token ? { Authorization: token } : {},
                });
                
                const blogsData = response.data.posts || response.data.blogs || [];
                setBlogs(Array.isArray(blogsData) ? blogsData : []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("");
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [navigate]);

    const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
    const filteredBlogs = blogs.filter((blog) => wordCount(blog.content) >= 20);
    const sortedBlogs = [...filteredBlogs].reverse();
    const isSignedIn = !!localStorage.getItem("authToken");

    // For guests: if no posts from API, show dummy posts so they see something and "Read more" → signin
    const postsToShow =
      sortedBlogs.length > 0 ? sortedBlogs : !isSignedIn ? DUMMY_POSTS : [];

    const SKELETON_COUNT = 4;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50">
            <Header token={getAuthHeader()} />
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                <div className="mb-10 text-center">
                    <h1 className="font-display text-3xl font-bold text-slate-800 sm:text-4xl">
                        Explore Stories
                    </h1>
                    <p className="mt-2 text-slate-600">Discover stories from our community</p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        <span className="mr-2">⚠️</span>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <PostCardSkeleton key={i} />
                        ))}
                    </div>
                ) : postsToShow.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <div className="text-5xl opacity-60">📝</div>
                        <h3 className="mt-4 font-display text-xl font-bold text-slate-800">
                            No stories yet
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-slate-600">
                            Be the first to share your story.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/write")}
                            className="mt-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg"
                        >
                            Write your story
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {postsToShow.map((blog, index) => (
                            <div
                                key={blog.key ?? `blog-${index}`}
                                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                <Content
                                    url={blog.url}
                                    author={blog.author?.name ?? "Unknown Author"}
                                    title={blog.title}
                                    content={blog.content}
                                    isSignedIn={isSignedIn}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

