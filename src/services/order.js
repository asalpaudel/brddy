// src/services/order.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/orders';

//  for a user to place an order
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(API_URL, orderData);
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

// for admi to get all orders, now with filtering
export const getAllOrders = async (status = '') => {
    try {
        // Base URL sorts by date in descending order (recent to old)
        let url = `${API_URL}?_sort=orderDate&_order=desc`;
        // If a status is provided, append it as a query parameter
        if (status) {
            url += `&status=${status}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return [];
    }
};

// for a user to get their own orders
export const getOrdersByUserEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}?customerInfo.email=${email}&_sort=orderDate&_order=desc`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
};

// for an admin to update an order's status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(`${API_URL}/${orderId}`, {
            status: status,
            lastUpdated: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};