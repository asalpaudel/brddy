import React, { useState, useEffect } from 'react';
import { HiOutlineCash } from 'react-icons/hi';
import { getAllOrders } from '../../services/order';

const SalesThisMonth = () => {
    const [monthlySales, setMonthlySales] = useState(0);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const allOrders = await getAllOrders();
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();

                const salesThisMonth = allOrders
                    .filter(order => {
                        const orderDate = new Date(order.orderDate);
                        // Filter for orders in the current month and year
                        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                    })
                    .reduce((total, order) => total + order.totalAmount, 0);

                setMonthlySales(salesThisMonth);
            } catch (error) {
                console.error("Failed to fetch order data for sales calculation:", error);
            }
        };

        fetchSalesData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
                <HiOutlineCash className="h-8 w-8 text-green-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-stone-500">Sales This Month</p>
                <p className="text-3xl font-bold text-stone-800">Rs. {monthlySales.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default SalesThisMonth;