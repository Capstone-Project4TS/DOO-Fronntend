// import axios from 'axios';
// import axiosInstance from './axiosInstance';

// export const fetchUser = async (userId: string) => {
//     const { data } = await axiosInstance.get(`/users/${userId}`);
//     return data;
// };

// interface LoginCredentials {
//     email: string;
//     password: string;
// }


// export const login = async ({ email, password }: LoginCredentials) => {
//     try {
//         const { data } = await axiosInstance.post('/users/login', { email, password });
//         console.log(data.user.activated)

//         if (data.user.activated == false) {
//             throw new Error("your account have been deactivated");
//         }
//         return data;
//     } catch (error: any) {
//         console.log(error)


//         if (axios.isAxiosError(error)) {
//             if (error.response?.data.errors && error.response.data.errors.length > 0) {
//                 throw new Error("Invalid login attempt. Please check your credentials and try again.");
//             }
//         }


//         throw new Error(error);
//     }
// };

// export const getUserData = async () => {
//     const { data } = await axiosInstance.get('/users/me');
//     return data;
// }

// export const createUser = async ({ email, password, role }: { email: string, password: string, role: string }) => {
//     const { data } = await axiosInstance.post('/users', { email, password, role });
//     return data;
// };

// export const allUser = async () => {
//     const { data } = await axiosInstance.get('/users/allusers');
//     return data;
// }

// export const verify = async ({ email, password }: LoginCredentials) => {
//     try {
//         const { data } = await axiosInstance.post('/users/verify', { email, password });
//         return data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {

//         }
//         throw new Error("An unexpected error occurred. Please try again later.");
//     }
// }

// export const getUser = async () => {
//     const { data } = await axiosInstance.get('/users');
//     return data;
// }

// export const activateUser = async (userInfo: object) => {
//     const activate: any = userInfo.active
 
//     const { data } = await axiosInstance.post(`/users/activate/${userInfo.id}`, { activate });
//     console.log(data)
//     return data;
// }

// export const filter = async (filter: object) => {
//     try {
//         const { data } = await axiosInstance.post('/users/filter', filter);
//         return data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {

//         }
//         throw new Error("An unexpected error occurred. Please try again later.");
//     }
// }