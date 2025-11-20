import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface PropertyImageSliderProps {
  images: { imageUrl: string }[];
}

const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1
    }
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden shadow-lg w-full">
      <Carousel
        responsive={responsive}
        swipeable
        draggable
        showDots
        infinite
        autoPlay
        autoPlaySpeed={4000}
        keyBoardControl
        customTransition="all 0.5s"
        transitionDuration={500}
        containerClass="rounded-2xl z-20"
        itemClass="px-0 "
        dotListClass="bottom-2"
        
      >
        {images.map((img, index) => (
          <img
            src={import.meta.env.VITE_IMAGE_URL + img.imageUrl}
            alt={`Property Image ${index + 1}`}
            className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover"
            loading="lazy"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(PropertyImageSlider);
;
