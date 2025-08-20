import React from "react";
import { Carousel as AntCarousel } from "antd";
import heroImage from "../../assets/banner.png"; // Make sure this path is correct

// Main Carousel component
const HeroBanner = () => (
  <div className="flex justify-center items-center bg-orange-50/80 py-12 px-4">
    <div className="w-full max-w-5xl text-center">
      {/* The dots={false} prop removes the carousel indicators.
        We removed the shadow and rounded styles from the container 
        since the content inside is no longer a single block.
      */}
      <AntCarousel autoplay autoplaySpeed={5000} effect="fade" dots={false}>
        {/* Single slide content */}
        <div>
          {/* Smaller image, centered */}
          <div className="flex justify-center mb-6">
            <img
              src={heroImage}
              alt="Bakery Banner"
              className="max-w-full md:max-w-lg h-auto rounded-lg"
            />
          </div>

          {/* Text is now directly below the image, with its own styling */}
          <div className="text-slate-800">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-amber-900">
              Everyday Freshly Baked
            </h2>
            <p className="text-lg md:text-xl font-light text-slate-900">
              Perfect for your sweet tooth.
            </p>
          </div>
        </div>
      </AntCarousel>
    </div>
  </div>
);

export default HeroBanner;