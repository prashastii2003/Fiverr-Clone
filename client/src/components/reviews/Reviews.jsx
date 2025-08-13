import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Something went wrong!</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      {/* Add Review Form */}
      <div className="add border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Add a review</h3>
        <form
          className="addForm flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Write your opinion"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-5 py-2 hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
