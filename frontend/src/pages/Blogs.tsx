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
                const response = await axios.get(`${backend_url}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: authHeader.split(" ")[1]
                    }
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

    // Helper to count words
    const wordCount = (text: string) => text.trim().split(/\s+/).length;

    setTimeout(() => {
        setloader(false)
    }, 3000);
    const filteredBlogs = blogs.filter(blog => wordCount(blog.content) >= 20);
    filteredBlogs.reverse()
    return Loader ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="flex items-center scale-110 gap-3 justify-center h-screen">
                <Skeleton className="h-12 w-12 rounded-full bg-blue-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-blue-200" />
                    <Skeleton className="h-4 w-[200px] bg-blue-200" />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
             <Header  token={getAuthHeader()}/>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Explore Stories</h1>
                    <p className="text-gray-600 text-lg">Discover amazing stories from our community</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
                        <div className="flex items-center">
                            <span className="text-red-500 mr-2">⚠️</span>
                            {error}
                        </div>
                    </div>
                )}

                {filteredBlogs.length === 0 && !loading && !error ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md border border-blue-100">
                        <div className="text-blue-300 text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Stories Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Be the first to share your story with the community and inspire others!</p>
                        <button 
                            onClick={() => navigate('/write')}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                        >
                            Write Your Story
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredBlogs.map((blog, index) => (
                            <div key={blog.key || `blog-${index}`} className="bg-white rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-200">
                                <Content 
                                    url={blog.url}
                                    author={blog.author?.name || 'Unknown Author'}
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

