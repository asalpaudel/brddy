import React from 'react';

// You can replace these with your actual image URLs
const galleryImages = [
    // An array of 9 images with carefully crafted column and row spans for a masonry effect
    { src: 'https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Bakery counter', span: 'col-span-2 row-span-2' },
    { src: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Cheesecake' },
    { src: 'http://localhost:4001/images/shiftingcocao.png', alt: 'Sifting cocoa' },
    { src: 'http://localhost:4001/images/breadbasket.png', alt: 'Bread Basket', span: 'col-span-2 row-span-2' },
    { src: 'https://images.pexels.com/photos/3808823/pexels-photo-3808823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Raspberry tartlets', span: 'col-span-2' },
    { src: 'https://images.pexels.com/photos/264727/pexels-photo-264727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Fresh croissant' },
    { src: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Macarons' },
    { src: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Bakery storefront', span: 'col-span-2' },
];

const ImageGallery = () => {
    return (
        <div className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Our Sweet Gallery
                </h2>
                <p className="text-lg text-stone-600 max-w-xl mx-auto">
                    Take a peek into our world of freshly baked goods, crafted with care and creativity.
                </p>
            </div>
            {/* The grid is now a 4-column grid on medium screens and up, creating a more complex layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
                {galleryImages.map((image, index) => (
                    <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${image.span || ''}`}>
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;