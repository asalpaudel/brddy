import React, { useState, useEffect } from 'react';
import { getOrdersByUserEmail } from '../../services/order';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('USER_EMAIL');

    useEffect(() => {
        if (!userEmail) {
            toast.error("You must be logged in to view your orders.");
            setLoading(false);
            return;
        }

        getOrdersByUserEmail(userEmail)
            .then(setOrders)
            .catch(() => toast.error("Failed to fetch your orders."))
            .finally(() => setLoading(false));

    }, [userEmail]);

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

    if (loading) return <div>Loading your orders...</div>;

    if (!userEmail) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                <p>You need to be logged in to see your order history.</p>
                <Link to="/login" className="mt-4 inline-block bg-amber-500 text-white px-6 py-2 rounded-md">Login</Link>
            </div>
        );
    }
    
    if (orders.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/products" className="mt-4 inline-block bg-amber-500 text-white px-6 py-2 rounded-md">Start Shopping</Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-stone-800 mb-6">My Orders</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-bold text-lg">Order #{order.id}</h2>
                                <p className="text-sm text-gray-500">
                                    Placed on: {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <ul className="space-y-2">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center">
                                            <img src={item.images[0]} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                                            <span>{item.name} x {item.quantity}</span>
                                        </div>
                                        <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="text-right mt-4 font-bold text-lg">
                            Total: Rs. {order.totalAmount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;