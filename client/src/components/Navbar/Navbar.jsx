import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/gigs?search=${searchInput}`);
    }
  };

  const categories = [
    "Graphics & Design",
    "Video & Animation",
    "Writing & Translation",
    "AI Services",
    "Digital Marketing",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all ${
        isScrolled || pathname !== "/"
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Main Nav */}
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-indigo-600">
            WorkSphere
          </span>
          <span className="text-indigo-500 text-2xl">•</span>
        </Link>

        {/* Search bar (only when scrolled or not on homepage) */}
        {(isScrolled || pathname !== "/") && (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-96">
            <input
              type="text"
              placeholder="Search for services..."
              className="flex-1 bg-transparent outline-none text-sm px-2"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img
                src="/images/search.png"
                alt="Search"
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </div>
        )}

        {/* Links & User Menu */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <span
            onClick={() => navigate("/becomeseller")}
            className="cursor-pointer hover:text-indigo-600"
          >
            WorkSphere Business
          </span>

          {/* Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <span className="cursor-pointer hover:text-indigo-600">
              Explore
            </span>
            {showCategories && (
              <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg w-56">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <span className="flex items-center gap-2">
            <img
              src="/images/language.png"
              alt="Language"
              className="w-4 h-4"
            />
            English
          </span>

          {!currentUser && (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Sign in
              </Link>
              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 text-white px-4 py-1 rounded-full hover:bg-indigo-700"
              >
                Join
              </button>
            </>
          )}

          {currentUser && (
            <div
              className="relative"
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={currentUser.img || "/images/noavtar.jpeg"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{currentUser.username}</span>
              </div>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40">
                  {currentUser.isSeller && (
                    <>
                      <Link
                        to="/mygigs"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Gigs
                      </Link>
                      <Link
                        to="/add"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/messages"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Messages
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Secondary menu when scrolled */}
      {(isScrolled || pathname !== "/") && (
        <div className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 py-2 text-sm text-gray-600 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/"
                className="whitespace-nowrap hover:text-indigo-600"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
