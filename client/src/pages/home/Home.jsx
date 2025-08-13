import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/Slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

const Home = () => {
  return (
    <div className="w-full">
      {/* Featured Section */}
      <Featured />
      <TrustedBy />

      {/* Explore Categories */}
      <div className="flex justify-center py-16">
        <div className="max-w-[1400px] w-full px-4">
          <h1 className="text-2xl font-semibold mb-8">Explore the marketplace</h1>
          <Slide slidesToShow={5} arrowsScroll={5}>
            {cards.map((card) => (
              <CatCard key={card.id} item={card} />
            ))}
          </Slide>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">A whole world of freelance talent at your fingertips</h1>
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-semibold">The best for every budget</h2>
                <p className="text-gray-600">Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quality work done quickly</h2>
                <p className="text-gray-600">Find the right freelancer to begin working on your project within minutes.</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Protected payments, every time</h2>
                <p className="text-gray-600">Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">24/7 support</h2>
                <p className="text-gray-600">Questions? Our round-the-clock support team is available to help anytime.</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <video className="rounded-lg shadow-lg w-full" src="./img/video.mp4" controls></video>
          </div>
        </div>
      </div>

      {/* Business Solutions */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-4">fiverr <span className="italic">business</span></h1>
            <h2 className="text-xl font-semibold">A business solution designed for teams</h2>
            <p className="text-gray-300">
              Upgrade to a curated experience packed with tools and benefits, dedicated to businesses.
            </p>
            <ul className="list-none flex flex-col gap-2 text-gray-300">
              <li>✔ Connect to freelancers with proven business experience</li>
              <li>✔ Get matched with the perfect talent by a customer success manager</li>
              <li>✔ Manage teamwork and boost productivity with one powerful workspace</li>
            </ul>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md w-fit mt-4">
              Explore Fiverr Business
            </button>
          </div>
          <div className="flex-1">
            <img
              className="rounded-lg shadow-lg w-full"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/general_assets/business/business_banner_870px.jpg"
              alt="Fiverr Business"
            />
          </div>
        </div>
      </div>

      {/* Project Inspirations */}
      <div className="flex justify-center py-16">
        <div className="max-w-[1400px] w-full px-4">
          <h1 className="text-2xl font-semibold mb-8">Get inspired with projects made by our freelancers</h1>
          <Slide slidesToShow={4} arrowsScroll={4}>
            {projects.map((project) => (
              <ProjectCard key={project.id} item={project} />
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Home;
