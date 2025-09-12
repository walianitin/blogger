import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: 'test@gmail.com', // pre-filled test email
        password: 'pasword123' // pre-filled test password
    });

  return (
    <>
    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl border border-blue-100">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
            </div>
        </div>

        <h3 className="mt-4 text-2xl font-bold text-center text-black">Welcome Back</h3>

        <p className="mt-2 text-center text-gray-600">Sign in to your account</p>

        <form>
            <div className="w-full mt-6">
                <input 
                    className="block w-full px-4 py-3 mt-2 text-black placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200" 
                    type="email" 
                    placeholder="test@gmail.com" 
                    aria-label="Email Address"  
                    value={data.email}
                    onChange={(e)=>setData({...data,email:e.target.value})}
                />
            </div>

            <div className="w-full mt-4">
                <input 
                    className="block w-full px-4 py-3 mt-2 text-black placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200" 
                    type="password" 
                    placeholder="password123" 
                    aria-label="Password" 
                    value={data.password}
                    onChange={(e)=>setData({...data,password:e.target.value})} 
                />
            </div>

            <div className="flex items-center justify-center mt-6">
                <button 
                    className="w-full px-6 py-3 text-sm font-semibold tracking-wide text-white capitalize transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post(`https://backedn.walianitin406.workers.dev/api/v1/user/signin`, data);
                            const token = response.data.jwt || response.data.token;
                            if (token) {
                                localStorage.setItem('authToken', token);
                                navigate("/explore");
                            }
                        } catch (error) {
                            console.error(error);
                            alert("Sign in failed");
                        }
                    }}
                >
                    Sign In
                </button>
            </div>
        </form>
    </div>
    <div className="flex items-center justify-center py-4 text-center bg-gradient-to-r from-blue-50 to-gray-50 border-t border-blue-100">
        <span className="text-sm text-gray-600">Don't have an account? </span>

        <a href="/signup" className="mx-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200">Sign Up</a>
    </div>
</div>
</div>
    </>
  )
}
