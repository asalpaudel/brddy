import React from 'react';
import { Carousel as AntCarousel } from 'antd';

// A mock database of bakery items to display in the carousel.
const bakeryItems = [
  {
    title: "Artisan Sourdough",
    description: "Hand-kneaded and slow-fermented for a perfect crust and tangy flavor.",
    image: "https://placehold.co/800x400/D2B48C/000?text=Sourdough"
  },
  {
    title: "Chocolate Croissants",
    description: "Flaky, buttery layers with a rich, dark chocolate filling.",
    image: "https://placehold.co/800x400/D2B48C/000?text=Croissants"
  },
  {
    title: "Blueberry Muffins",
    description: "Moist and fluffy muffins packed with fresh, juicy blueberries.",
    image: "https://placehold.co/800x400/D2B48C/000?text=Muffins"
  },
  {
    title: "Classic Bagels",
    description: "Boiled and baked for that perfect New York-style chew.",
    image: "https://placehold.co/800x400/D2B48C/000?text=Bagels"
  }
];

// Main Carousel component.
const HeroBanner = () => (
  <div className="flex justify-center items-center bg-gray-50 pt-8">
    <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
      <AntCarousel autoplay autoplaySpeed={5000} className="rounded-lg">
        {bakeryItems.map((item, index) => (
          <div key={index} className="relative">
            {/* The image for the carousel slide */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-96 object-cover rounded-lg"
            />
            
            {/* Overlay for text and button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white rounded-lg">
              <h3 className="text-3xl font-bold mb-2 drop-shadow-md">{item.title}</h3>
              <p className="text-lg font-light mb-4 drop-shadow-sm">{item.description}</p>
              <button className="bg-amber-500 text-white w-full text-left px-4 py-2 rounded-md hover:bg-amber-600 font-medium shadow-sm transition-colors">
                View Product
              </button>
            </div>
          </div>
        ))}
      </AntCarousel>
    </div>
  </div>
);

// Export the main component
export default HeroBanner;