import React from "react";
import './slide.scss';
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
    <div className="slide">
      <div className="container keen-slider" ref={sliderRef}>
        {React.Children.map(children, (child, index) => (
          <div className="keen-slider__slide" key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
