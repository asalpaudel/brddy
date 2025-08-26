import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllOrders } from '../../services/order';
import { toast } from 'react-toastify';

const COLORS = {
    Pending: '#FFBB28',
    Processing: '#0088FE',
    Shipped: '#00C49F',
    Delivered: '#84d8b1',
    Cancelled: '#FF8042',
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0];
        return (
            <div className="p-4 bg-white border rounded-lg shadow-lg">
                <p className="font-bold text-lg">{`${dataPoint.name}`}</p>
                <p className="text-base">{`Orders: ${dataPoint.value}`}</p>
            </div>
        );
    }
    return null;
};

const OrderStatusPieChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orders = await getAllOrders();
                const statusCounts = orders.reduce((acc, order) => {
                    acc[order.status] = (acc[order.status] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.keys(statusCounts).map(status => ({
                    name: status,
                    value: statusCounts[status],
                }));
                setData(chartData);
            } catch (error) {
                toast.error("Failed to fetch order data for chart.");
            }
        };
        fetchOrderData();
    }, []);

    if (data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Order Status Distribution</h3>
                <p className="text-stone-500">No order data to display.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-stone-800 mb-4">Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderStatusPieChart;