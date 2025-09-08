import React, { useState, useEffect, useRef } from 'react';
const banners = [
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757274198/ecommercee/ykxzoqxqjoy0ixcsm36a.jpg",
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757309205/ecommercee/ytbojejil9mie3iqfd3u.jpg",
  "https://res.cloudinary.com/dkqvwdfyp/image/upload/v1757309205/ecommercee/zof0gbyfnktdievz6pvp.jpg",
]

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef();

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % banners.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 3000); // change every 3s
    return () => clearInterval(slideInterval.current);
  }, []);

  const handleMouseEnter = () => clearInterval(slideInterval.current);
  const handleMouseLeave = () => {
    slideInterval.current = setInterval(nextSlide, 3000);
  };

  return (
    <div 
      className="relative w-full h-[200px] overflow-hidden rounded-2xl"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner}
          alt={`banner-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
};

export default BannerCarousel;
