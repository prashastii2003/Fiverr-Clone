import { Link, useNavigate } from 'react-router-dom';

const BecomeSeller = () => {
  const navigate = useNavigate();

  const steps = [
    {
      img: "/images/becomeseller1.svg",
      title: "Learn what makes a successful profile",
      text: "Discover the do’s and don’ts to ensure you’re always on the right track."
    },
    {
      img: "/images/becomeseller2.svg",
      title: "Create your seller profile",
      text: "Add your profile picture, description, and professional information."
    },
    {
      img: "/images/becomeseller3.svg",
      title: "Publish your Gig",
      text: "Create a Gig of the service you’re offering and start selling instantly."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">
        
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to start selling on <span className="text-indigo-600">Worksphere</span>? Here’s the breakdown:
          </h1>

          {steps.map((step, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center gap-3">
                <img src={step.img} alt="check" className="w-8 h-8" />
                <h3 className="text-lg font-semibold text-gray-700">{step.title}</h3>
              </div>
              <p className="text-gray-600 mt-1 ml-11">{step.text}</p>
              {index !== steps.length - 1 && <hr className="my-4 border-gray-200" />}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div>
          <video
            src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/966b0ae895e85b526600eff1d21e3cf4-1674728725728/Seller%20onboarding%20video%20HQ"
            controls
            className="w-full rounded-lg shadow-md"
          ></video>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-8 gap-4">
        <button
          onClick={() => navigate('/becomeSeller2')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Become Seller
        </button>
        <Link
          to="/"
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default BecomeSeller;
