import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const { data: currentUserData } = useQuery({
    queryKey: ["seller"],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumbs */}
        <span className="text-sm text-gray-500">
          <Link to="/messages" className="text-blue-500 hover:underline">
            MESSAGES
          </Link>{" "}
          &gt;{" "}
        </span>

        {/* Messages */}
        {isLoading ? (
          <p className="text-gray-600 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-red-500 mt-4">Something went wrong</p>
        ) : (
          <div className="flex flex-col gap-4 my-6">
            {data.map((m) => (
              <div
                key={m._id}
                className={`flex gap-3 items-start ${
                  m.userId === currentUser._id ? "flex-row-reverse text-right" : ""
                }`}
              >
                <img
                  src={
                    m.userId === currentUser._id
                      ? `/images/noavtar.jpeg`
                      : `/images/noavtar.jpeg`
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    m.userId === currentUser._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        <hr className="my-4" />

        {/* Write message */}
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a message..."
            className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
