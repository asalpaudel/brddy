// src/page/admin/Dashboard.jsx

import React from 'react';
import TotalProducts from '../../component/admin/TotalProducts';
import TotalCategories from '../../component/admin/TotalCategories'; // 1. Import the new component

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-6">Dashboard Overview</h1>
            
            {/* Grid for Dashboard Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Product Count Widget */}
                <TotalProducts />

                {/* Category Count Widget */}
                <TotalCategories /> {/* 2. Add the new component here */}

                {/* You can add more widgets here in the future */}
                {/* <TotalUsers /> */}
                {/* <Revenue /> */}
                
            </div>
        </div>
    );
};

export default Dashboard;