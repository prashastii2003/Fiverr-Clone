import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const [like, setlike] = useState(false);
  const [dislike, setdislike] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  const handlelike = () => {
    setlike(true);
  };
  const handledislike = () => {
    setdislike(true);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm mb-4">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="flex items-center mb-3">
          <img
            className="w-12 h-12 rounded-full object-cover mr-3"
            src={data.img || "/images/noavtar.jpeg"}
            alt=""
          />
          <div>
            <span className="font-semibold text-gray-800">{data.username}</span>
            <div className="text-gray-500 text-sm">{data.country}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 mb-2">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img
              src="/images/star.png"
              alt=""
              key={i}
              className="w-4 h-4 object-contain"
            />
          ))}
        <span className="text-sm text-gray-600">{review.star}</span>
      </div>

      <p className="text-gray-700 mb-3">{review.desc}</p>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Helpful?</span>
        <img
          src={like ? "/images/like.png" : "/images/likeColor.png"}
          alt=""
          onClick={handlelike}
          className="w-5 h-5 cursor-pointer"
        />
        <span>Yes</span>
        <img
          src={dislike ? "/images/dislike.png" : "/images/dislike_color.png"}
          alt=""
          onClick={handledislike}
          className="w-5 h-5 cursor-pointer"
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
