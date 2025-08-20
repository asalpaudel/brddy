import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/product'; 
import ProductCard from './ProductCard'; 
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(setProducts)
            .catch(() => toast.error("Failed to fetch products."));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;