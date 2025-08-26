import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { toast } from 'react-toastify';
import { updateOrderStatus } from '../../services/order';
import { HiX } from 'react-icons/hi';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ViewOrder = ({ order, onClose }) => {
    const [newStatus, setNewStatus] = useState(order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusUpdate = async () => {
        setIsUpdating(true);
        try {
            await updateOrderStatus(order.id, newStatus);
            toast.success(`Order #${order.id} status updated to ${newStatus}.`);
            onClose(); // Close the view and trigger a re-fetch
        } catch (error) {
            toast.error("Failed to update order status.");
        } finally {
            setIsUpdating(false);
        }
    };

    const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-stone-700">Order Details (#{order.id})</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <HiX className="h-6 w-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order & Customer Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer and Shipping Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Customer Details</h3>
                            <p><strong>Name:</strong> {order.customerInfo.name}</p>
                            <p><strong>Email:</strong> {order.customerInfo.email}</p>
                            <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                            <p>{order.shippingDetails.address}</p>
                        </div>
                    </div>
                    
                    {/* Remarks */}
                    {order.remarks && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Order Remarks</h3>
                            <p className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
                                {order.remarks}
                            </p>
                        </div>
                    )}

                    {/* Order Items */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Order Items</h3>
                        <ul className="divide-y border rounded-lg">
                            {order.items.map(item => (
                                <li key={item.id} className="flex items-center justify-between p-3">
                                    <div className="flex items-center">
                                        <img src={(item.images && item.images.length > 0) ? item.images[0] : ''} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                             <li className="flex justify-between p-4 bg-gray-50 font-bold text-lg">
                                <span>Total</span>
                                <span>Rs. {order.totalAmount.toFixed(2)}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Map and Status Update */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Delivery Location</h3>
                        <div className="h-64 w-full rounded-lg overflow-hidden border">
                            <MapContainer center={order.shippingDetails.mapLocation} zoom={15} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={order.shippingDetails.mapLocation}></Marker>
                            </MapContainer>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Update Status</h3>
                        <div className="flex items-center gap-2">
                             <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="block w-full input-field">
                                {orderStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button onClick={handleStatusUpdate} disabled={isUpdating} className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 disabled:bg-amber-300">
                                {isUpdating ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;