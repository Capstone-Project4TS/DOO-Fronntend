import { createFileRoute } from '@tanstack/react-router';
import AdminHead from '../components/adminHead';
import AdminMiddle from '../components/adminMiddle';
import AdminEnd from '../components/adminEnd';
import NavBar2 from '../components/NavBar';
import SideBar from '../components/SideBar';
import UserName from '../components/UserName';
import { useState, useEffect, useRef } from 'react';
import { fetchAdminDashboardData, fetchAdminWorkflow } from '../services/api/report';
import { GridColDef } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


// Define the interface to match the response data structure
interface ActiveUser {
  month: string;
  count: number;
}

interface WorkflowStatusCount {
  status: string;
  count: number;
}

interface RolesByDepartment {
  _id: string;
  rolesCount: number;
}

interface DashboardData {
  activeUsers?: ActiveUser[]; // Making activeUsers optional
  workflowStatusCounts: WorkflowStatusCount[];
  workflowTemplateCount: number;
  documentTemplateCount: number;
  rolesByDepartment: RolesByDepartment[];
}

interface WorkflowData {
  id: string; // Adjusted to include the id property
  name: string;
  status: string;
  currentStageIndex: number;
  isArchived: boolean;
  createdAt: string; // Added createdAt field
  updatedAt: string; // Added updatedAt field
}

const AdminDashboard = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user || '{}');

  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchedDataRef = useRef<DashboardData | null>(null);
  const [workflowData, setWorkflowData] = useState<WorkflowData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: DashboardData = await fetchAdminDashboardData();
        if (result) {
          fetchedDataRef.current = result;
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!fetchedDataRef.current) {
      getData();
    } else {
      setData(fetchedDataRef.current);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAdminWorkflow();
        if (result) {
          // Ensure each row has a unique id and include createdAt and updatedAt fields
          const formattedData = result.map((item: WorkflowData) => ({
            ...item,
            id: item._id, // Assuming _id is unique for each row
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }));
          setWorkflowData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching workflow data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userData.username) {
      history.push('/login');
    }
  }, [userData.username]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
          <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
        </div>
    );
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'currentStageIndex', headerName: 'Stage', flex: 1 },
    { field: 'createdAt', headerName: 'Creation Date', flex: 1 }, // New column for createdAt
    { field: 'updatedAt', headerName: 'Updated Date', flex: 1 }, // New column for updatedAt
  ];

  return (
    <div className="mt-24 ml-72 mr-16">
      <UserName />
      <div className='fixed top-0 bottom-0 left-0'><SideBar /></div>
      <div className="header flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-raleway font-bold text-purple-900 text-4xl leading-10">
            Hello, {userData.username}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-5">
        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Workflow Templates</h3>
          <p className="text-6xl text-purple-900 animate-fade-in-up">
            {data ? data.workflowTemplateCount : (
              <div className="rounded-full h-8 w-8 bg-teal-400 animate-ping"></div>
            )}
          </p>
        </div>
        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Document Templates</h3>
          <p className="text-6xl text-purple-900 animate-fade-in-up">
            {data ? data.documentTemplateCount : (
              <div className="rounded-full h-8 w-8 bg-teal-400 animate-ping"></div>
            )}
          </p>
        </div>

        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Workflows</h3>
          
           
              <p  className="text-6xl text-purple-900 animate-fade-in-up">
               {workflowData.length}
              </p>
           
          
        </div>
      </div>
      <div>
        <div className='mt-8'><h3 className='text-teal-500 text-xl font-semibold mb-4'>All Workflows </h3></div>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={workflowData}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={3}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};
export const Route = createFileRoute('/adminDashboard')({
  component: AdminDashboard
});
