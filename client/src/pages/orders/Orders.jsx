import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border">
                    Image
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border">
                    Title
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4 border">
                      <img
                        src={order.img}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border">{order.title}</td>
                    <td className="py-2 px-4 border font-medium text-green-600">
                      ${order.price}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <img
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                        src="/images/message.png"
                        alt="message"
                        onClick={() => handleContact(order)}
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
};

export default Orders;
