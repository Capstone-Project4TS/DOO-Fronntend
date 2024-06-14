import axios from 'axios';

export const fetchreports = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/reports', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching report data');
  }
};

export const fetchAdminDashboardData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/dashboard', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching admin dashboard data');
  }
};

export const fetchUserDashboardData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/user/dashboard', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user dashboard data');
  }
};

export const fetchAdminWorkflow = async () => {
  try {
    const response = await axios.get('http://localhost:5000/initiate/workflows', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching workflow data');
  }
};
