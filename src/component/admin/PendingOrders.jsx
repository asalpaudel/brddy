import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/order';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const allOrders = await getAllOrders('Pending');
                setPendingOrders(allOrders);
            } catch (error) {
                toast.error("Failed to fetch pending orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchPendingOrders();
    }, []);

    if (loading) {
        return <div className="bg-white p-6 rounded-lg shadow-lg">Loading pending orders...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-stone-800">Pending Orders</h3>
                <Link to="/admin/orders" className="text-amber-500 hover:underline">
                    View All
                </Link>
            </div>
            {pendingOrders.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {pendingOrders.map(order => (
                        <li key={order.id} className="py-3 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-stone-700">Order #{order.id}</p>
                                <p className="text-sm text-stone-500">{order.customerInfo.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-amber-600">Rs. {order.totalAmount.toFixed(2)}</p>
                                <p className="text-xs text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-stone-500 text-center py-4">No pending orders.</p>
            )}
        </div>
    );
};

export default PendingOrders;