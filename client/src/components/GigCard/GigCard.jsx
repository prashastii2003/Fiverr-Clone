import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  return (
    <Link
      to={`/gig/${item._id}`}
      className="block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Cover Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={item.cover}
            alt={item.title || "Gig"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Section */}
        <div className="p-4">
          {/* User */}
          {isLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">Something went wrong</p>
          ) : (
            <div className="flex items-center gap-3 mb-2">
              <img
                src={data.img || "/images/noavtar.jpeg"}
                alt={data.username}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <span className="text-gray-800 font-medium text-sm">
                {data.username}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.desc}</p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <img src="/images/star.png" alt="star" className="w-4 h-4" />
            <span className="text-yellow-500 font-semibold text-sm">
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Price + Heart */}
        <div className="flex items-center justify-between p-4">
          <img
            src="/images/heart.png"
            alt="like"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
          <div className="text-right">
            <span className="text-gray-500 text-xs">STARTING AT</span>
            <h2 className="text-lg font-bold text-gray-800">
              ${item.price}
              <sup className="text-xs">99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
