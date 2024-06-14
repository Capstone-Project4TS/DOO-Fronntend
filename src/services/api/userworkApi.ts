import axios from 'axios';
import axiosInst from './axiosInst';
export const fetchdetail = async (catagId) => {
    try {
        const response = await axiosInst.get(`admin/workflows/${catagId}`)
        const { data } = response;
        return { data, isLoading: false, isError: false };
        // assuming isLoading and isError are handled elsewhere
        console.log(data)
    } catch (error) {
        console.error('Error fetching detail:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const workapprove = async (workflowId, userId, comment) => {
    console.log(workflowId)
    console.log(userId)
    console.log(comment)
    try {
        const response = await axiosInst.post(`initiate/workflows/approve/`, { workflowId, userId, comment });
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error approving workflow:', error);
        return { error, isLoading: false, isError: true };
    }
};
export const workareject = async (workflowId, userId, comment) => {
    try {
        const response = await axiosInst.post(`initiate/workflows/reject/`, { workflowId, userId, comment });
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { error, isLoading: false, isError: true };
    }
};
export const workforward = async (workflowId, userId, comment) => {
    try {
        const response = await axiosInst.post(`initiate/workflows/forward/`, { workflowId, userId, comment });

        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { error, isLoading: false, isError: true };
    }
};
export const workback = async (workflowId, userId, comment) => {
    try {
        const response = await axiosInst.post(`initiate/workflows/backward/`, { workflowId, userId, comment });
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { error, isLoading: false, isError: true };
    }
};
export const workdetail = async (workflowId, userId) => {
    try {
        const response = await axiosInst.get(`initiate/workflows/${workflowId}/user/${userId}`);
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const workuser = async (userId) => {
    try {
        const response = await axiosInst.get(`initiate/userWorkflow/${userId}`);
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error rejecting workflow:', error);
        return { data: null, isLoading: false, isError: true };
    }
};