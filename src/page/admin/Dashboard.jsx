import React from 'react';
import TotalProducts from '../../component/admin/TotalProducts';
import TotalCategories from '../../component/admin/TotalCategories';
import OrderStatusPieChart from '../../component/admin/OrderStatusPieChart';
import PendingOrders from '../../component/admin/PendingOrders';
import TotalOrders from '../../component/admin/TotalOrders';
import SalesThisMonth from '../../component/admin/SalesThisMonth'; 

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <SalesThisMonth /> 
                <TotalOrders />
                <TotalProducts />
                <TotalCategories />
                <OrderStatusPieChart />   
                <PendingOrders />

            </div>
        </div>
    );
};

export default Dashboard;