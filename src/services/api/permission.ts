import axiosInst from './axiosInst';


export const addPermission = async (permissions: any, roleId: any) => {
    try {
        const response = await axiosInst.post(`admin/roles/${roleId}/permissions`, { permissions: permissions })
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const removePermission = async (permissions: any, roleId: any) => {
    try {
        console.log('perm', permissions)
        const response = await axiosInst.delete(`admin/roles/${roleId}/permissions/${permissions}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};



