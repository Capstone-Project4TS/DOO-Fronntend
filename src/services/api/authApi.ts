import axios from 'axios';
import axiosInst from './axiosInst';
export const loginUser = async (selectedUsers) => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('api/login', { selectedUsers}); // Include selectedUsers in the request body
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const logoutUser = async () => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('api/logout'); // Include selectedUsers in the request body
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};