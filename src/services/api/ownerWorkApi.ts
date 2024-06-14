import axios from 'axios';
import axiosInst from './axiosInst';



export const ownerWork = async (userId) => {
    try {
        const response = await axiosInst.get(`/initiate/workflows/owner/${userId}`);
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false }; 
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const workflowDetail = async (workflowId, userId) => {
    try {
        const response = await axiosInst.get(`http://localhost:5000/initiate/workflows/${workflowId}/user/${userId}`);
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false }; 
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { data: null, isLoading: false, isError: true };
    }
};


