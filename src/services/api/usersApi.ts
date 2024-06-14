import axios from 'axios';
import axiosInst from './axiosInst';
export const fetchUser = async () => {
    try {
        const response = await axiosInst.get('api/admin/getAllUsers');
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const createCommite = async (formData) => {
    console.log(formData)
    try {
      const response = await axiosInst.post('/admin/committee', formData);
      console.log(formData)
      const { data } = response;
      return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
      console.error('Error creating committee:', error);
      return { data: null, isLoading: false, isError: true };
    }
  };
  export const rolebyid = async ( depId: any) => {
    try {
        console.log('perm', depId)
        const response = await axiosInst.get(`admin/roles/dep/${depId}`)
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
  

export const sendUser = async (selectedUsers) => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('api/sendInvitation', {selectedUsers}); // Include selectedUsers in the request body
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const forgot = async (email) => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('api/generateOTP', {email}); // Include selectedUsers in the request body
        const { data } = response;
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const reset = async (oldPassword,newPassword) => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.put('api/change-password', { oldPassword, newPassword }); // Include selectedUsers in the request body
        const { data } = response;
        
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const resendUser = async (selectedUser) => { // Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('api/resendInvitation', { identifier: selectedUser}); // Include selectedUsers in the request body
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const activateUser = async (userId) => {
    try {
        const response = await axiosInst.put(`api/admin/users/${userId}/activate`);
        const { data } = response;
        console.log({ data })
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error activating user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const deactivateUser = async (userId) => {
    try {
        const response = await axiosInst.put(`api/admin/users/${userId}/deactivate`);
        const { data } = response;
        console.log({ data })
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error deactivating user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};


export const fetchWorkflow = async () => async (userId) => {
    try {
        const response = await axiosInst.put(`admin/workflows/${userId}`);
        const { data } = response;
        console.log({ data })
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error deactivating user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};