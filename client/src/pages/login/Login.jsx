import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await newRequest.post('/auth/login', { username, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate('/');
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Sign in</h1>

                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    onChange={e => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Login
                </button>

                {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
