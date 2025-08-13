import React, { useState, useRef, useEffect } from "react";
import GigCard from "../../components/GigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [refetch, sort]);

  const resort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  return (
    <div className="py-8 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <span className="text-sm text-gray-500 block mb-2">
          WORKSPHERE &gt; GRAPHICS & DESIGN &gt;
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold capitalize mb-2">design</h1>
        <p className="text-gray-600 mb-6">
          Explore the boundaries of art and technology with Worksphere's AI
          artists
        </p>

        {/* Filters Menu */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          {/* Left - Budget */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={apply}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded"
            >
              Apply
            </button>
          </div>

          {/* Right - Sort */}
          <div className="relative flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <span className="font-medium">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="/images/down.png"
              alt="sort"
              className="w-4 h-4 cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 top-6 bg-white shadow-md border rounded w-40 z-10">
                {sort === "sales" ? (
                  <span
                    onClick={() => resort("createdAt")}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() => resort("sales")}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Best Selling
                  </span>
                )}
                <span
                  onClick={() => resort("sales")}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <h4 className="col-span-full text-red-600 font-medium">
              Something went wrong
            </h4>
          ) : data.length === 0 ? (
            <h4 className="col-span-full text-orange-700 font-medium">
              No gigs found
            </h4>
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
