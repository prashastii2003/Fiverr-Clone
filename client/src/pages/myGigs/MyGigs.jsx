import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="p-6">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "error"
      ) : (
        <div className="max-w-[1400px] mx-auto">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                  Add New Gig
                </button>
              </Link>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Title</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Sales</th>
                  <th className="p-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((gig) => (
                  <tr
                    key={gig._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        src={gig.cover}
                        alt={gig.title}
                      />
                    </td>
                    <td className="p-3 border-b">{gig.title}</td>
                    <td className="p-3 border-b">${gig.price}</td>
                    <td className="p-3 border-b">{gig.sales}</td>
                    <td className="p-3 border-b">
                      <img
                        className="w-6 h-6 cursor-pointer hover:opacity-70"
                        src="/images/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(gig._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
