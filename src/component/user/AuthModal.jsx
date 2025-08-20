import React from 'react';
import { HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <HiX size={24} />
                    </button>
                </div>
                <HiOutlineExclamationCircle className="mx-auto text-amber-500 h-16 w-16 mb-4" />
                <h3 className="text-2xl font-bold text-stone-800 mb-2">Authentication Required</h3>
                <p className="text-stone-600 mb-6">
                    You need to be logged in to add items to your cart or place an order.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => handleNavigate('/login')}
                        className="w-full bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition-colors font-semibold"
                    >
                        Go to Login
                    </button>
                    <button
                        onClick={() => handleNavigate('/')}
                        className="w-full bg-gray-200 text-stone-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;