import axios from 'axios';
import { sha256 } from '../utils/encryption';

export const AUTH_TOKEN = '516fb57b-f2c5-4985-95e1-e3e4836d8bd4';
const API_URL = 'http://localhost:4000/users';

const ADMIN_CREDENTIALS = {
    email: 'admin@admin.com',
    password: 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7',
    role: 'admin',
};

export const doLogin = async (email, password) => {
    try {
        const hashedPassword = await sha256(password);

        // Handle admin login
        if (email === ADMIN_CREDENTIALS.email && hashedPassword === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
            localStorage.setItem('USER_EMAIL', ADMIN_CREDENTIALS.email);
            localStorage.setItem('USER_ROLE', ADMIN_CREDENTIALS.role);
            localStorage.setItem('USER_FNAME', 'Admin');
            localStorage.setItem('USER_LNAME', 'User');
            localStorage.setItem('USER_ID', 'admin_user'); // Admin has a placeholder ID
            return { loggedIn: true, role: 'admin' };
        }

        // Handle regular user login
        const response = await axios.get(`${API_URL}?email=${email}&password=${hashedPassword}`);
        if (response.data.length > 0) {
            const user = response.data[0];
            localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
            localStorage.setItem('USER_EMAIL', user.email);
            localStorage.setItem('USER_ROLE', user.role || 'user');
            localStorage.setItem('USER_FNAME', user.firstName);
            localStorage.setItem('USER_LNAME', user.lastName);
            localStorage.setItem('USER_ID', user.id); // <- Key Change: Store the user's ID
            return { loggedIn: true, role: user.role || 'user' };
        } else {
            return { loggedIn: false, role: null };
        }
    } catch (error) {
        console.error("Login service error:", error);
        return { loggedIn: false, role: null };
    }
};

export const doRegister = async (firstName, lastName, email, password) => {
    try {
        // Check if user already exists
        const checkResponse = await axios.get(`${API_URL}?email=${email}`);
        if (checkResponse.data.length > 0) {
            throw new Error("An account with this email already exists.");
        }

        const hashedPassword = await sha256(password);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date().toISOString(),
        };

        const createResponse = await axios.post(API_URL, newUser);
        return createResponse.data;

    } catch (error) {
        console.error("Registration service error:", error.message);
        throw error;
    }
};