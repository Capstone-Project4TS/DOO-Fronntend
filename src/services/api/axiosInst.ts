/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInst= axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
   
});
export default axiosInst;