import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import HeroBanner from '../../component/user/HeroBanner';
import ProductList from '../../component/user/ProductList';
import ImageGallery from '../../component/user/ImageGallery';
import { getAllProducts } from '../../services/product';
import { toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getAllProducts();
                // show only 8 products
                setProducts(productData.slice(0, 8)); 
            } catch (error)
{
                toast.error("Failed to load featured products.");
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <HeroBanner />
            {/* Featured Products Section */}
            <div className="my-12 relative">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-stone-800 mb-8">
                    Featured Products
                </h2>

                {/* View All Products link - positioned top right */}
                <Link 
                    to="/products" 
                    className="absolute right-0 top-2 text-amber-500 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                    View All Products
                </Link>

                {/* Limit products to 9 */}
                <ProductList products={products.slice(0, 9)} />
            </div>

            {/* 2. New "About Us" Section */}
            <div className="bg-orange-50/80 py-16 px-4 text-center">
                <h2 className="text-3xl font-bold text-amber-900 mb-4">From Our Kitchen to Yours</h2>
                <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
                    Founded in a small, cozy kitchen, Brrdy began with a simple mission: to bake bread that not only tastes good but also feels like home. We believe in honoring traditional techniques and using only the finest ingredients.
                </p>
                <Link
                    to="/about"
                    className="inline-block bg-transparent border-2 border-amber-500 text-amber-600 px-8 py-3 rounded-md hover:bg-amber-500 hover:text-white transition-colors duration-300 font-semibold text-lg"
                >
                    Learn More About Us
                </Link>
            </div>
            <ImageGallery />

        </>
    );
};

export default Home;