import axios from 'axios';
import { toast } from 'react-toastify';

// API Base URL - works in both development and production
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            // Handle specific error cases
            if (status === 401) {
                localStorage.removeItem('token');
                toast.error('Session expired. Please login again.');
                window.location.href = '/login';
            } else if (status === 403) {
                toast.error(data.message || 'Access denied');
            } else if (status === 404) {
                toast.error(data.message || 'Resource not found');
            } else if (status === 429) {
                toast.error('Too many requests. Please try again later.');
            } else if (status >= 500) {
                toast.error('Server error. Please try again later.');
            } else if (data.message) {
                toast.error(data.message);
            }
        } else if (error.request) {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default api;
