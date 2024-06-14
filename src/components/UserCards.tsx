import React, { useState, useEffect } from 'react';

const GraphCards = () => {
  const [data, setData] = useState({
    initiatedWorkflowsCount: 0,
    assignedWorkflowsCount: 0,
    createdDocumentsCount: 0,
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/dashboard');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <div className="mt-5 font-semibold flex flex-col items-center w-72 h-44 rounded-md gap-4 border border-gray-200  shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
        <h3 className="font-urbanist text-2xl font-bold text-teal-600 leading-6">Initiated Workflows</h3>
        <p className="text-6xl text-purple-900 animate-fade-in-up">{data.initiatedWorkflowsCount}</p>
      </div>
      <div className="mt-5 font-semibold flex flex-col items-center w-72 h-44 rounded-md gap-4 border border-gray-200  shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
        <h3 className="font-urbanist text-2xl font-bold text-teal-600 leading-6">Assigned Workflows</h3>
        <p className="text-6xl text-purple-900 animate-fade-in-up">{data.assignedWorkflowsCount}</p>
      </div>
      <div className="mt-5 font-semibold flex flex-col items-center w-72 h-44 rounded-md gap-4 border border-gray-200  shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
        <h3 className="font-urbanist text-2xl font-bold text-teal-600 leading-6">Created Documents</h3>
        <p className="text-6xl text-purple-900 animate-fade-in-up">{data.createdDocumentsCount}</p>
      </div>
    </div>
  );
}

export default GraphCards;
