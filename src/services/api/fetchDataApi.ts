import axiosInst from './axiosInst';

export const fetchCatag = async (depId: any) => {
    try {
       
        const response = await axiosInst.get(`admin/category/${depId}`)
       
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
       
        return { data: null, isLoading: false, isError: true };
    }
};

export const fetchSubCatag = async (catagId: any) => {
    try {
        const response = await axiosInst.get(`admin/subCategory/cat/${catagId}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const fetchDepartment = async () => {
    try {
        const response = await axiosInst.get(`admin/deps`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const fetchtCommittee = async () => {
    try {
        const response = await axiosInst.get(`admin/committee`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const fetchRole = async (depId: any) => {
    try {
        const response = await axiosInst.get(`admin/roles/dep/${depId}`)
        
        const { data } = response;
        console.log(data)
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};


export const fetchRequiredDocument = async (subCategoryId: any) => {
    try {
        const response = await axiosInst.get(`admin/documentTemplate/sub/${subCategoryId}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const fetchStepData = async (workflowId: any) => {
    try {
        const response = await axiosInst.get(`admin/workflow-templates/requiredDoc/${workflowId}`)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};

export const uploadFile = async (file: any) => {
    try {
        const response = await axiosInst.post(`initiate/upload`,file)
        const { data } = response;
        return { data, isLoading: false, isError: false }; // assuming isLoading and isError are handled elsewhere
    } catch (error) {
        console.error('Error fetching catagory:', error);
        return { data: null, isLoading: false, isError: true };
    }
};
