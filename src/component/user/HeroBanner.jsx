import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/banner.png';

const HeroBanner = () => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
        navigate('/products');
    };

    return (
        <div className="flex items-center bg-orange-50/80 min-h-[70vh] py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                
                {/* Text */}
                <div className="md:col-span-2 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-4">
                        Freshly Baked Bread, Everyday!
                    </h1>
                    <p className="text-lg text-slate-700 mb-8">
                        From crusty loaves to soft rolls, we bake daily with love and the finest ingredients—bringing the aroma of fresh bread straight to your table.
                    </p>
                    <button
                        onClick={handleOrderNow}
                        className="border text-amber-600 px-8 py-3 rounded-md hover:bg-amber-600 hover:text-white transition-colors duration-100 font-semibold shadow-lg text-lg"
                    >
                        Order Now
                    </button>
                </div>

                <div className="md:col-span-3 hidden md:flex justify-center items-center">
                    <img
                        src={banner}
                        alt="Freshly baked bread basket"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
