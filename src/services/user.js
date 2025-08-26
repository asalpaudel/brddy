import axios from 'axios';
import { sha256 } from '../utils/encryption';

const API_URL = 'http://localhost:4000/users';

/**
 * Fetches all users from the database.
 */
export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

/**
 * Fetches a single user by their unique ID.
 */
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

/**
 * Deletes a user from the database.
 */
export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

/**
 * Updates a user's data in the database.
 */
export const updateUser = async (userId, userData) => {
    try {
        // If a new password is provided (and not already hashed), hash it before updating.
        if (userData.password && userData.password.length < 60) {
            userData.password = await sha256(userData.password);
        }
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};