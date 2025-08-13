import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Slide = ({ children, slidesToShow }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: slidesToShow || 3,
      spacing: 15,
    },
  });

  return (
    <div className="flex justify-center pb-[100px]">
      <div className="w-[1400px] relative keen-slider" ref={sliderRef}>
        {React.Children.map(children, (child, index) => (
          <div className="keen-slider__slide" key={index}>
            {child}
          </div>
        ))}

        {/* Navigation buttons if needed */}
        <button className="carousel-prev w-[50px] h-[50px] bg-gray-200 rounded-full absolute top-0 bottom-0 my-auto left-0 z-10 flex items-center justify-center">
          ‹
        </button>
        <button className="carousel-next w-[50px] h-[50px] bg-gray-200 rounded-full absolute top-0 bottom-0 my-auto right-0 z-10 flex items-center justify-center">
          ›
        </button>
      </div>
    </div>
  );
};

export default Slide;
