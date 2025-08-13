import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ item }) => {
  return (
    <Link to={`/gigs?cat=${item.cat}`} className="block no-underline">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={item.img}
          alt=""
          className="w-full h-48 object-cover"
        />
        <div className="flex items-center gap-3 p-4">
          <img
            src={item.pp}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">{item.cat}</h2>
            <span className="text-sm text-gray-500">{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
