import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import Header from '../components/Header';
import { Skeleton } from '../components/ui/skeleton';


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

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [Loader,setloader]=useState(true);
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
                console.error('Error fetching blogs:', err);
                setError('Failed to load blogs. Please try again.');
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [navigate]);

    setTimeout(() => {
        setloader(false);
    }, 3000);

    const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
    const filteredBlogs = blogs.filter((blog) => wordCount(blog.content) >= 20);
    const sortedBlogs = [...filteredBlogs].reverse();
    return Loader ? (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/30">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
                <div className="space-y-2 text-center">
                    <Skeleton className="h-4 w-48 bg-slate-200" />
                    <Skeleton className="h-4 w-32 bg-slate-200" />
                </div>
            </div>
        </div>
    ) : (
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

                {sortedBlogs.length === 0 && !loading && !error ? (
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
                        {sortedBlogs.map((blog, index) => (
                            <div
                                key={blog.key ?? `blog-${index}`}
                                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                <Content
                                    url={blog.url}
                                    author={blog.author?.name ?? "Unknown Author"}
                                    title={blog.title}
                                    content={blog.content}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

