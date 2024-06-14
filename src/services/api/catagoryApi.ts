import axios from 'axios';
import axiosInst from './axiosInst';


export const createcatag = async (categoryData: any) => {
    console.log(categoryData)// Pass selectedUsers as a parameter
    try {
        const response = await axiosInst.post('admin/category', categoryData); // Include selectedUsers in the request body
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false };
    } catch (error) {
        console.error('Error fetching user:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
export const fetchCatag = async () => {
    try {
        const response = await axiosInst.get('admin/category')
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const DeleteCatag = async (catagoryId: any) => {
    try {
        const response = await axiosInst.delete(`/admin/category/${catagoryId}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};


export const EditCatag = async (catagoryId: any, catagoryName: any) => {
    try {
        const response = await axiosInst.put(`admin/category/${catagoryId}`, { name: catagoryName, subcategories: [] })
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};



