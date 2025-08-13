import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import newRequest from '../../utils/newRequest';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put('/orders', { payment_intent });
        setTimeout(() => {
          navigate("orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      {/* Success Animation */}
      <img
        src="images/successfully-done.gif"
        alt="Payment Successful"
        className="w-48 h-48 mb-6 rounded-full shadow-lg"
      />

      {/* Success Message */}
      <div className="text-center bg-white p-6 rounded-xl shadow-md max-w-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700">
          You are being redirected to the <span className="font-semibold">Orders</span> page.
        </p>
        <p className="text-sm text-gray-500 mt-1">Please do not close this page.</p>
      </div>

      {/* Redirect Info */}
      <span className="mt-4 text-sm text-gray-500 italic">
        Redirecting in a few seconds...
      </span>
    </div>
  );
};

export default Success;
