import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/order';
import { toast } from 'react-toastify';
import { HiEye } from 'react-icons/hi';
import ViewOrder from '../../component/admin/ViewOrder'; // We will create this next

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderToView, setOrderToView] = useState(null);

    const fetchOrders = () => {
        setLoading(true);
        getAllOrders()
            .then(setOrders)
            .catch(() => toast.error("Failed to fetch orders."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewOrder = (order) => {
        setOrderToView(order);
    };

    const handleCloseView = () => {
        setOrderToView(null);
        fetchOrders(); // Re-fetch orders in case status was updated
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-indigo-100 text-indigo-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (orderToView) {
        return <ViewOrder order={orderToView} onClose={handleCloseView} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-stone-700 mb-6">Manage Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Customer</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Total</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-stone-700">
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-8">Loading orders...</td></tr>
                        ) : orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-amber-50">
                                    <td className="py-3 px-4 font-mono text-sm">#{order.id}</td>
                                    <td className="py-3 px-4">{order.customerInfo.name}</td>
                                    <td className="py-3 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button onClick={() => handleViewOrder(order)} className="text-gray-500 hover:text-gray-700">
                                            <HiEye className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="text-center py-8">No orders found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersAdmin;