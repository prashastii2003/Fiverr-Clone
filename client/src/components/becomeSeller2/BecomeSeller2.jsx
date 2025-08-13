import { Link, useNavigate } from 'react-router-dom';

const BecomeSeller2 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left side image */}
        <div className="flex justify-center">
          <img
            src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/6efbf3f896f8ad45ed66505a6df63a60-1636629911828/seller_onboarding_overview_do.png"
            alt="Seller Onboarding"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Right side content */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            What makes a successful Worksphere profile?
          </h1>
          <p className="text-gray-600 mb-8">
            Your first impression matters! Create a profile that will stand out from the crowd on Worksphere.
          </p>

          {/* Tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <img src="/images/becomeseller2_1svg.svg" alt="" className="w-10 h-10" />
              <p className="text-gray-700">Take your time in creating your profile so it’s exactly as you want it to be.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="/images/becomeseller2_2.svg" alt="" className="w-10 h-10" />
              <p className="text-gray-700">Add credibility by linking out to your relevant professional networks.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="/images/becomeseller2_3.svg" alt="" className="w-10 h-10" />
              <p className="text-gray-700">Accurately describe your professional skills to help you get more work.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="/images/becomeseller2_4.svg" alt="" className="w-10 h-10" />
              <p className="text-gray-700">Put a face to your name! Upload a profile picture that clearly shows your face.</p>
            </div>
            <div className="flex items-start gap-3">
              <img src="/images/becomeseller2_5.svg" alt="" className="w-10 h-10" />
              <p className="text-gray-700">To keep our community secure for everyone, we may ask you to verify your ID.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Create a New Account as Seller
            </button>
            <Link
              to="/becomeSeller"
              className="text-blue-600 hover:underline self-center"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller2;
