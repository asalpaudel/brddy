import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { getAllOrders } from '../../services/order';

const TotalOrders = () => {
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        // Fetch orders and update the count
        getAllOrders()
            .then(orders => {
                setOrderCount(orders.length);
            })
            .catch(error => {
                console.error("Failed to fetch orders for count:", error);
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
                <HiOutlineShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-stone-500">Total Orders</p>
                <p className="text-3xl font-bold text-stone-800">{orderCount}</p>
            </div>
        </div>
    );
};

export default TotalOrders;