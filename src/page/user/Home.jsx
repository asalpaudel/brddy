// src/page/user/Home.jsx

import React from 'react';
// FIX: Changed path from ../ to ../../
import HeroBanner from '../../component/user/HeroBanner'; 
import ProductList from '../../component/user/ProductList';

const Home = () => {
    return (
        <>
            <HeroBanner />
            <ProductList />
        </>
    );
};

export default Home;