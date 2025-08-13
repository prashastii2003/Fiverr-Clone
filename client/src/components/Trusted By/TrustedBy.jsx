import React from "react";

const TrustedBy = () => {
  return (
    <div className="w-full bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center gap-6 px-4">
        <span className="text-gray-600 font-medium">Trusted by:</span>
        <img
          className="h-8 object-contain"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
          alt="meta"
        />
        <img
          className="h-8 object-contain"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
          alt="google"
        />
        <img
          className="h-8 object-contain"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
          alt="netflix"
        />
        <img
          className="h-8 object-contain"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
          alt="p&g"
        />
        <img
          className="h-8 object-contain"
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
          alt="paypal"
        />
      </div>
    </div>
  );
};

export default TrustedBy;
