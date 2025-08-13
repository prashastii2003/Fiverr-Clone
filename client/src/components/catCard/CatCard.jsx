import React from "react";
import { Link } from "react-router-dom";

const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?cat=${item.title}`} className="block">
      <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="block text-sm text-gray-200">{item.desc}</span>
          <span className="block text-lg font-semibold text-white">
            {item.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;
