import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the context
const CartContext = createContext();

// Define the reducer function to manage cart state
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.find(item => item.id === product.id);

            if (existingItem) {
                // If item exists, update its quantity
                return state.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // If item is new, add it to the cart
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
        case 'LOAD_CART': {
            return action.payload;
        }
        default:
            return state;
    }
};

// Create the provider component
export const CartProvider = ({ children }) => {
    // Initialize state, trying to load from localStorage first
    const [cartItems, dispatch] = useReducer(cartReducer, [], (initial) => {
        try {
            const localData = localStorage.getItem('brrdy-cart');
            return localData ? JSON.parse(localData) : initial;
        } catch (error) {
            console.error("Could not parse cart data from localStorage", error);
            return initial;
        }
    });

    // Persist cart state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('brrdy-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Actions to be exposed
    const addToCart = (product, quantity = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
        toast.success(`${product.name} added to cart!`);
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        toast.info("Item removed from cart.");
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context easily
export const useCart = () => {
    return useContext(CartContext);
};