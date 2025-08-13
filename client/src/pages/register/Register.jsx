import React, { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* Left Section */}
        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create a New Account
          </h1>

          <label className="block mb-2 font-medium text-gray-700">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mb-4 p-3 border rounded-lg bg-gray-50"
          />

          <label className="block mb-2 font-medium text-gray-700">Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-10 bg-gray-50 border-l">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Become a Seller
          </h1>

          <div className="flex items-center justify-between mb-6">
            <label className="font-medium text-gray-700">
              Activate seller account
            </label>
            <input
              type="checkbox"
              onChange={handleSeller}
              className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            />
          </div>

          <label className="block mb-2 font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="5"
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
