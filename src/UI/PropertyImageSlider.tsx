import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";


import { Navigation, Pagination } from "swiper/modules"; 

interface PropertyImageSliderProps {
  images: any[];
}

const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({ images }) => {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-2xl"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={import.meta.env.VITE_IMAGE_URL + img.imageUrl}
              alt={`Property Image ${index + 1}`}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyImageSlider;
