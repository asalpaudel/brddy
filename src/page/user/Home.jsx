import React, { useState, useEffect } from 'react';
import HeroBanner from '../../component/user/HeroBanner';
import ProductList from '../../component/user/ProductList';
import { getAllProducts } from '../../services/product';
import { toast } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getAllProducts();
                // Fetch all products but only show the first 6 on the home page
                setProducts(productData.slice(0, 6)); 
            } catch (error) {
                toast.error("Failed to load featured products.");
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <HeroBanner />
            <div className="my-12">
                <h2 className="text-3xl font-bold text-center text-stone-800 mb-8">
                    Featured Products
                </h2>
                {/* Pass the fetched products to the ProductList component */}
                <ProductList products={products} />
            </div>
        </>
    );
};

export default Home;