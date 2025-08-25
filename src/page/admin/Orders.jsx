// src/page/admin/Orders.jsx

import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../services/order';
import { toast } from 'react-toastify';
import { HiEye, HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import ViewOrder from '../../component/admin/ViewOrder';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderToView, setOrderToView] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for recent to oldest, 'asc' for oldest to recent

    const fetchOrders = () => {
        setLoading(true);
        getAllOrders(statusFilter)
            .then(data => {
                // Apply sorting based on the sortOrder state
                const sortedData = data.sort((a, b) => {
                    if (sortOrder === 'desc') {
                        return new Date(b.orderDate) - new Date(a.orderDate);
                    } else {
                        return new Date(a.orderDate) - new Date(b.orderDate);
                    }
                });
                setOrders(sortedData);
            })
            .catch(() => toast.error("Failed to fetch orders."))
            .finally(() => setLoading(false));
    };

    // Re-fetch and sort orders when the filter or sort order changes
    useEffect(() => {
        fetchOrders();
    }, [statusFilter, sortOrder]);

    const handleViewOrder = (order) => {
        setOrderToView(order);
    };

    const handleCloseView = () => {
        setOrderToView(null);
        fetchOrders(); 
    };
    
    // Toggles the sort order between ascending and descending
    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
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
    
    const orderStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (orderToView) {
        return <ViewOrder order={orderToView} onClose={handleCloseView} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-stone-700">Manage Orders</h2>
                <div className="flex items-center gap-4">
                    {/* Sort Button */}
                    <button
                        onClick={toggleSortOrder}
                        className="flex items-center gap-2 text-sm font-medium text-stone-700 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        title={sortOrder === 'desc' ? 'Sort oldest to newest' : 'Sort newest to oldest'}
                    >
                        {sortOrder === 'desc' ? <HiOutlineSortDescending className="h-5 w-5" /> : <HiOutlineSortAscending className="h-5 w-5" />}
                        <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
                    </button>
                    
                    {/* Status Filter */}
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value === 'All' ? '' : e.target.value)}
                        className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    >
                        <option value="All">All Statuses</option>
                        {orderStatuses.slice(1).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
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