/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    // Add the Authorization header to every request
    // @ts-expect-error
    (config: AxiosRequestConfig) => {
        const authCookie = localStorage.getItem('auth-session');
        let token;
        try {
            token = authCookie ? JSON.parse(authCookie).token : null;
        } catch (error) {
            console.error('Failed to parse auth_token local storage:', error);
        }
        if (token) {
            config.headers && (config.headers.Authorization = `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;