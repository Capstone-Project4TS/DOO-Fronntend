import axios from 'axios';
import axiosInst from './axiosInst';
export const fetchnotification = async (userid: any) => {
    try {
        const response = await axiosInst.get(`/initiate/notifications/${userid}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};