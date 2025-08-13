import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  return (
    <div className="w-full py-8 px-4 md:px-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-indigo-500 rounded-full"></div>
        </div>
      ) : error ? (
        <h4 className="text-center text-red-500">Something went wrong</h4>
      ) : (
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr] gap-8">
          {/* Left Section */}
          <div>
            <span className="text-sm text-gray-500">
              WORKSPHERE &gt; GRAPHICS & DESIGN &gt;
            </span>
            <h1 className="text-3xl font-bold mt-2">{data.title}</h1>

            {/* Seller Info */}
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={dataUser.img || "/images/noavtar.jpeg"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold">{dataUser.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="flex items-center gap-1">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((_, i) => (
                          <img
                            src="/images/star.png"
                            alt=""
                            key={i}
                            className="w-4 h-4"
                          />
                        ))}
                      <span className="text-sm text-gray-600">
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Slider */}
            <div
              ref={sliderRef}
              className="keen-slider mt-6 rounded-lg overflow-hidden shadow-md"
            >
              {data.images.map((img, i) => (
                <div className="keen-slider__slide" key={i}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-96 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* About Gig */}
            <h2 className="text-2xl font-semibold mt-6">About This Gig</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{data.desc}</p>

            {/* About Seller */}
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold">About The Seller</h2>
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={dataUser.img || "/images/noavtar.jpeg"}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold">{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="flex items-center gap-1">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((_, i) => (
                            <img
                              src="/images/star.png"
                              alt=""
                              key={i}
                              className="w-4 h-4"
                            />
                          ))}
                        <span className="text-sm text-gray-600">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="mt-2 px-4 py-1 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition">
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">From</span>
                      <p>{dataUser.country}</p>
                    </div>
                    <div>
                      <span className="font-medium">Member since</span>
                      <p>Aug 2022</p>
                    </div>
                    <div>
                      <span className="font-medium">Avg. response time</span>
                      <p>4 hours</p>
                    </div>
                    <div>
                      <span className="font-medium">Last delivery</span>
                      <p>1 day</p>
                    </div>
                    <div>
                      <span className="font-medium">Languages</span>
                      <p>English</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <p className="text-gray-700">{dataUser.desc}</p>
                </div>
              </div>
            )}

            {/* Reviews */}
            <Reviews gigId={id} key={id} />
          </div>

          {/* Right Section */}
          <div className="bg-white border rounded-lg shadow-lg p-6 h-fit sticky top-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{data.sortTitle}</h3>
              <h2 className="text-3xl font-bold text-indigo-600">
                ${data.price}
              </h2>
            </div>
            <p className="text-gray-700">{data.sortDesc}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <img src="/images/clock.png" alt="" className="w-5 h-5" />
                <span>{data.deliveryTime} days Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <img src="/images/recycle.png" alt="" className="w-5 h-5" />
                <span>{data.rivisonNumber} Revisions</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {data.features.map((feature, i) => (
                <div className="flex items-center gap-2 text-sm" key={i}>
                  <img
                    src="/images/greencheck.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
