import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import { CategoriesContext } from '../../context/CategoriesContext';
import { WidthFullOutlined } from '@mui/icons-material';

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,   // الافتراضي على الشاشات الكبيرة
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1280, // أقل من xl
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024, // أقل من lg
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768, // أقل من md
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480, // أقل من sm
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };



  const { getAllCategory, allCategory, loading } = useContext(CategoriesContext);


  useEffect(() => {
    getAllCategory();
  }, []);


  return <>

    <Slider {...settings}>
      {allCategory?.map((category, i) =>
        <div key={i} className='mb-5 mt-1'>
          <img src={category.imageUrl} className='w-full h-[400px]' alt={category.description} />
          <h3>{category.name}</h3>
        </div>)}
      {allCategory?.map((category, i) =>
        <div key={i} className='mb-5 mt-1'>
          <img src={category.imageUrl} className='w-full h-[400px]' alt={category.description} />
          <h3>{category.name}</h3>
        </div>)}
    </Slider>
  </>
}
