import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "./slice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
  const dispatch = useDispatch();
  const { data: banners, loading } = useSelector(
    (state) => state.bannerReducer
  );

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!banners || banners.length === 0) return <p>No banners available</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.maBanner}>
        
            <img
              src={banner.hinhAnh}
              alt={`Banner ${banner.maBanner}`}
              className="w-full h-700 sm:h-700 md:h-700 lg:h-700 xl:h-[700px] object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
