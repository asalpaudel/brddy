import React, { useState, useEffect } from 'react';
import { HiOutlineCube } from 'react-icons/hi';
import { getAllProducts } from '../../services/product';

const TotalProducts = () => {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        // Fetch products and update the count
        getAllProducts()
            .then(products => {
                setProductCount(products.length);
            })
            .catch(error => {
                console.error("Failed to fetch products for count:", error);
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-amber-100 p-4 rounded-full">
                <HiOutlineCube className="h-8 w-8 text-amber-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-stone-500">Total Products</p>
                <p className="text-3xl font-bold text-stone-800">{productCount}</p>
            </div>
        </div>
    );
};

export default TotalProducts;