import axiosInst from './axiosInst';

// Function to create a document category with subcategories and folder hierarchy
export const createDocumentCategory = async (name, subcategories, depId) => {
  try {
    const response = await axiosInst.post('/document-category', {
      name,
      subcategories,
      depId
    });
    const { data } = response;
    return { data, isLoading: false, isError: false };
  } catch (error) {
    console.error('Error creating document category:', error);
    return { data: null, isLoading: false, isError: true };
  }
};

// Function to fetch the folder hierarchy
export const fetchFolderHierarchy = async () => {
  try {
    const response = await axiosInst.get('/folder/fetchrepos');
    const { data } = response;
    return { data, isLoading: false, isError: false };
  } catch (error) {
    console.error('Error fetching folder hierarchy:', error);
    return { data: null, isLoading: false, isError: true };
  }
};
