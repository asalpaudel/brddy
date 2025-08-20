import React from 'react';
import TotalProducts from '../../component/admin/TotalProducts';
import TotalCategories from '../../component/admin/TotalCategories'; 

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <TotalProducts />

                <TotalCategories /> 

                
            </div>
        </div>
    );
};

export default Dashboard;