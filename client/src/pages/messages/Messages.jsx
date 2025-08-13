import React from "react";
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from 'moment';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="w-full flex justify-center py-6">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-full max-w-6xl px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
                    {currentUser.isSeller ? "Buyer" : "Seller"}
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
                    Last Message
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => {
                  const isUnread =
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer);

                  return (
                    <tr
                      key={c.id}
                      className={`${isUnread ? "bg-yellow-100" : "bg-white"} border-b hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4">
                        {currentUser.isSeller ? c.buyerId : c.sellerId}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/message/${c.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {c?.lastMessage?.substring(0, 100)}...
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        {moment(c.updatedAt).fromNow()}
                      </td>
                      <td className="px-6 py-4">
                        {isUnread && (
                          <button
                            onClick={() => handleRead(c.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          >
                            Mark as Read
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
