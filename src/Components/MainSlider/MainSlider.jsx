import React from "react";
import Slider from "react-slick";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

export default function MainSlider() {
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col lg:flex-row my-6 gap-4">
      <div className="w-full lg:w-3/4 relative">
        <Slider {...settings}>
          <img className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-top  rounded-xl hover:scale-105 transition-transform duration-500" src={banner1} alt="slide 1" />
          <img className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-top  rounded-xl hover:scale-105 transition-transform duration-500" src={banner2} alt="slide 2" />
          <img className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-center  rounded-xl hover:scale-105 transition-transform duration-500" src={banner3} alt="slide 3" />
        </Slider>
      </div>

      <div className="hidden lg:flex flex-col w-1/4 gap-4">
        <img className="w-full h-[240px] object-cover object-top  rounded-xl hover:scale-105 transition-transform duration-500" src={banner2} alt="side 1" />
        <img className="w-full h-[240px] object-cover object-top  rounded-xl hover:scale-105 transition-transform duration-500" src={banner3} alt="side 2" />
      </div>
    </div>
  );
}
