import React from 'react';
import TotalProducts from '../../component/admin/TotalProducts'; // Import the new component

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-6">Dashboard Overview</h1>
            
            {/* Grid for Dashboard Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Product Count Widget */}
                <TotalProducts />

                {/* You can add more widgets here in the future */}
                {/* <TotalUsers /> */}
                {/* <Revenue /> */}
                
            </div>
        </div>
    );
};

export default Dashboard;