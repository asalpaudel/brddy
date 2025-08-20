
import React from 'react';
import ProductList from '../../component/user/ProductList';

const Products = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-6">All Products</h1>
            <ProductList />
        </div>
    );
};

export default Products;