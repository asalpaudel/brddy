// src/services/auth.js

import axios from 'axios';
import { sha256 } from '../utils/encryption'; // Import the encryption function

export const AUTH_TOKEN = '516fb57b-f2c5-4985-95e1-e3e4836d8bd4';

const ADMIN_CREDENTIALS = {
    email: 'admin@admin.com',
    // Hashed value of a secure password like 'admin-pass-123'
    password: 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7',
    role: 'admin',
};

export const doLogin = async (email, password) => {
    try {
        const hashedPassword = await sha256(password);

        // First, check for the hard-coded admin account
        if (email === ADMIN_CREDENTIALS.email && hashedPassword === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
            localStorage.setItem('USER_EMAIL', ADMIN_CREDENTIALS.email);
            localStorage.setItem('USER_ROLE', ADMIN_CREDENTIALS.role);
            return true;
        }

        // If not the admin, proceed with the fake API login
        const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${hashedPassword}`);

        if (response.data.length > 0) {
            localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
            localStorage.setItem('USER_EMAIL', response.data[0].email);
            localStorage.setItem('USER_ROLE', response.data[0].role || 'user'); // Default to 'user' if not specified
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Login service error:", error);
        return false;
    }
};