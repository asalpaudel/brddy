import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/product'; 
import ProductCard from './ProductCard'; 
import { toast } from 'react-toastify';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return <p className="text-stone-500">No products found that match your criteria.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;