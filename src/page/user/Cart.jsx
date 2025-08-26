import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiPlus, HiMinus } from 'react-icons/hi';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-stone-700 mb-4">Your Cart is Empty</h1>
                <p className="text-stone-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-stone-800 mb-6 border-b pb-4">Shopping Cart</h1>
            <div className="space-y-6">
                {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
                        <div className="flex items-center gap-4">
                        <img 
                            src={(item.images && item.images.length > 0) ? item.images[0] : 'https://placehold.co/100x100?text=No+Image'} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded-md" 
                        />
                            <div>
                                <h3 className="font-semibold text-stone-700">{item.name}</h3>
                                <p className="text-sm text-stone-500">Rs. {parseFloat(item.price).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100"><HiMinus /></button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100"><HiPlus /></button>
                            </div>
                            <p className="font-semibold w-20 text-right">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2"><HiOutlineTrash size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end items-start gap-8">
                <div className="w-full sm:w-1/2 space-y-3 p-6 bg-gray-50 rounded-lg">
                    <div className="flex justify-between font-bold text-xl text-stone-800 border-t pt-3">
                        <span>Total</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout"
                        className="w-full block text-center mt-4 bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;