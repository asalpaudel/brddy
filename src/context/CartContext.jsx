import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthModal from '../component/user/AuthModal';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.find(item => item.id === product.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...state, { ...product, quantity }];
            }
        }
        case 'REMOVE_FROM_CART': {
            return state.filter(item => item.id !== action.payload.id);
        }
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            return state.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            );
        }
        case 'CLEAR_CART': {
            return [];
        }
        case 'LOAD_CART': {
            return action.payload;
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartReducer, []);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);

    // Effect to get the current user on initial load
    useEffect(() => {
        const email = localStorage.getItem('USER_EMAIL');
        setCurrentUserEmail(email);
    }, []);

    // Effect to load the correct cart when the user changes
    useEffect(() => {
        if (currentUserEmail) {
            const localData = localStorage.getItem(`brrdy-cart-${currentUserEmail}`);
            if (localData) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(localData) });
            } else {
                dispatch({ type: 'CLEAR_CART' });
            }
        } else {
            dispatch({ type: 'CLEAR_CART' });
        }
    }, [currentUserEmail]);

    // Effect to save the cart to storage when it changes
    useEffect(() => {
        if (currentUserEmail) {
            localStorage.setItem(`brrdy-cart-${currentUserEmail}`, JSON.stringify(cartItems));
        }
    }, [cartItems, currentUserEmail]);

    // --- Actions exposed to components ---

    const addToCart = (product, quantity = 1) => {
        const isLoggedIn = !!localStorage.getItem('AUTH_TOKEN');
        if (!isLoggedIn) {
            setIsAuthModalOpen(true);
            return;
        }
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
        toast.success(`${product.name} added to cart!`);
    };

    // --- FIX: Added the missing function logic ---
    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        toast.info("Item removed from cart.");
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };
    
    // Function to update the session, called on login/logout
    const updateUserSession = () => {
        const email = localStorage.getItem('USER_EMAIL');
        setCurrentUserEmail(email);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, updateUserSession }}>
            {children}
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};