// src/page/user/AboutUs.jsx

import React from 'react';
import { FaFeatherAlt, FaHeart, FaSeedling } from 'react-icons/fa';
import bannerImage from '../../assets/dunots.png'; 
import ImageGallery from '../../component/user/ImageGallery';

const AboutUs = () => {
    return (
        <div>
            {/* Section 1: Our Story */}
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Our Story
                </h1>
                <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                    A passion for baking that spans generations, bringing you the finest artisan breads and pastries, all made with love and the finest local ingredients.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">From Humble Beginnings</h2>
                    <p className="text-stone-700 space-y-4">
                        <span>
                            Founded in a small, cozy kitchen, Brrdy began with a simple mission: to bake bread that not only tastes good but also feels like home. What started as a neighborhood favorite has blossomed into a beloved community institution, but our core values remain unchanged.
                        </span>
                        <br/><br/>
                        <span>
                            We believe in honoring traditional techniques, using only the finest ingredients, and treating every customer like family. Our journey is one of passion, dedication, and the simple joy of sharing a freshly baked loaf.
                        </span>
                    </p>
                </div>
                <div className="flex justify-center">
                    <img 
                        src={bannerImage} 
                        alt="A basket of freshly baked breads" 
                        className="rounded-lg object-cover w-full h-auto max-w-md"
                    />
                </div>
            </div>

            {/* Section 2: Our Values */}
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-10" style={{ fontFamily: 'Georgia, serif' }}>Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="bg-orange-50/80 p-8 rounded-lg shadow-md">
                        <div className="flex justify-center mb-4">
                            <div className="bg-pink-100 p-4 rounded-full">
                                <FaSeedling className="h-8 w-8 text-pink-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">Quality Ingredients</h3>
                        <p className="text-stone-600">
                            We source our flour from local mills, use organic eggs from nearby farms, and import specialty ingredients directly from artisan producers.
                        </p>
                    </div>
                    {/* Value 2 */}
                    <div className="bg-orange-50/80 p-8 rounded-lg shadow-md">
                        <div className="flex justify-center mb-4">
                            <div className="bg-orange-100 p-4 rounded-full">
                                <FaFeatherAlt className="h-8 w-8 text-orange-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">Traditional Methods</h3>
                        <p className="text-stone-600">
                            Our breads are hand-shaped and baked in stone ovens. We believe that time and patience create flavors that machines cannot replicate.
                        </p>
                    </div>
                    {/* Value 3 */}
                    <div className="bg-orange-50/80 p-8 rounded-lg shadow-md">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-100 p-4 rounded-full">
                                <FaHeart className="h-8 w-8 text-red-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">Community First</h3>
                        <p className="text-stone-600">
                            We're more than a bakery; we're a gathering place where neighbors become friends and every visit feels like coming home.
                        </p>
                    </div>
                </div>
            </div>
            <ImageGallery />

        </div>
        
    );
};

export default AboutUs;