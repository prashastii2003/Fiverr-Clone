import React, { useState, useEffect } from "react";

const Featured = () => {
  const heroImages = [
    "/hero1.webp",
    "/hero2.webp",
    "/hero3.webp",
    "/hero4.webp",
    "/hero5.webp",
    "/hero6.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-[600px] flex justify-center items-center text-white overflow-hidden bg-center bg-cover transition-all duration-1000"
      style={{
        backgroundImage: `url(${heroImages[currentImageIndex]})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div> {/* dark overlay for text visibility */}

      <div className="relative w-full max-w-[1400px] px-4 flex items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 mt-12 z-10">
          <h1 className="text-5xl font-bold">
            Find the perfect <span className="italic font-light">freelance services</span>
          </h1>

          {/* SEARCH BOX */}
          <div className="bg-white rounded-md flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-2">
              <img src="/search-icon.svg" alt="search" className="w-5 h-5 ml-3" />
              <input
                type="text"
                placeholder="Try 'web design'"
                className="border-none outline-none p-2 text-gray-700"
              />
            </div>
            <button className="w-32 h-12 bg-green-500 hover:bg-green-600 text-white font-medium text-lg">
              Search
            </button>
          </div>

          {/* POPULAR TAGS */}
          <div className="flex items-center gap-3 text-base font-montserrat">
            <span>Popular:</span>
            {["Web Design", "WordPress", "Logo Design", "AI Services"].map((tag, idx) => (
              <button
                key={idx}
                className="text-white border border-white px-3 py-1 rounded-full bg-transparent text-sm font-montserrat hover:bg-white hover:text-black transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
