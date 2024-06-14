import { createFileRoute } from '@tanstack/react-router';
import UserEnd from '../components/UserEnd';
import SideBar2 from '../components/SideBar2';
import UserName from "../components/UserName";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import {fetchUserDashboardData} from '../services/api/report';

interface UserData {
  username: string;
}

interface DashboardData {
  initiatedWorkflowsCount: number;
  assignedWorkflowsCount: number;
  createdDocumentsCount: number;
}

const UserDashboard: React.FC = () => {
  const user = localStorage.getItem("user");
  const userData: UserData = user ? JSON.parse(user) : { username: '' };
  const history = useHistory(); // Use useHistory from react-router-dom

  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: DashboardData = await fetchUserDashboardData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []); // The empty dependency array ensures this runs only once

  // Check if the user is authenticated, if not, navigate to the login page
  useEffect(() => {
    if (!userData.username) {
      history.push('/login');
    }
  }, [userData.username, history]);

  return (
    <div className="mt-24 ml-72 mr-16">
      <UserName />
      <SideBar2 />
      <div className="header flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-raleway font-bold text-purple-900 text-4xl leading-10">
            Hello, {userData.username}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-5">
        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Initiated Workflows</h3>
          <p className="text-6xl text-purple-900 animate-fade-in-up">{data ? data.initiatedWorkflowsCount : ( 
          <div className="rounded-full  h-8 w-8 bg-teal-400 animate-ping">
        </div>)}</p>
        </div>
        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Assigned Workflows</h3>
          <p className="text-6xl text-purple-900 animate-fade-in-up">{data ? data.assignedWorkflowsCount :( 
          <div className="rounded-full h-8 w-8 bg-teal-400 animate-ping">
        </div>)}</p>
        </div>
        <div className="mt-5 font-semibold flex flex-col items-center w-72 h-36 rounded-md gap-4 border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
          <h3 className="font-urbanist text-lg text-teal-600 leading-6">Created Documents</h3>
          <p className="text-6xl text-purple-900 animate-fade-in-up">{data ? data.createdDocumentsCount : ( 
          <div className="rounded-full  h-8 w-8 bg-teal-400 animate-ping">
        </div>)}</p>
        </div>
      </div>
      <UserEnd/>
    </div>
  );
};

export const Route = createFileRoute('/userDashboard')({
  component: UserDashboard
});
