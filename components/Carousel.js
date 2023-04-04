import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/core";
import Link from "next/link";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const IR_API_BASE_URL = "http://localhost:8080/api/v1/irs";

const Carousel = () => {
  const [irs, setIrs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(IR_API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setIrs(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={6}
        spaceBetween={0}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {irs.map((ir) => (
          <SwiperSlide key={ir.nombre}>
            <Link href={`/ir/${encodeURIComponent(ir.nombre)}`}>
                <div
                  className="bg-cover bg-center h-full w-full md:w-80 md:h-96 cursor-pointer"
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,${ir.foto})`,
                  }}
                >
                  <div className="flex flex-col justify-between h-full p-4 bg-gradient-to-b from-transparent to-black bg-opacity-60">
                    <div className="text-white text-2xl font-semibold"></div>
                    <div className="text-white text-xl font-semibold bottom-0">
                      {ir.nombre}
                    </div>
                  </div>
                </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;











