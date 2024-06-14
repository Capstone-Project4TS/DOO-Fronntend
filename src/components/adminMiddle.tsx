import React from 'react';

const AdminMiddle = () => {
  // Sample data for rendering divs dynamically
  const divData = [
    { id: 1, title: "Number of comittees" },
    { id: 2, title: "Workflows" },
    { id: 3, title: "Users" },
    { id: 4, title: "Document Created" }
  ];

  return (
    <div className=' flex  gap-9'>
     < div className="mt-5 flex flex-col w-60 rounded-md border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
    <h3 className="font-urbanist font-bold text-purple-900 text-xl leading-6 mb-4">Workflows</h3>
    <ul className="flex flex-col gap-1 items-center pl-4">
      <li className="text-red-500 text-sm flex items-center justify-between">
        <span className="list-disc text-red-700">&#8226;</span> Rejected <span className="text-red-700 rounded-full px-2">{2}</span>
      </li>
      <li className="text-blue-400 text-sm flex items-center justify-between">
        <span className="list-disc text-blue-700">&#8226;</span> Pending <span className="text-blue-700 rounded-full px-2">{5}</span>
      </li>
      <li className="text-teal-500 text-sm flex items-center justify-between">
        <span className="list-disc text-teal-700">&#8226;</span> Approved <span className="text-teal-700 rounded-full px-2">{9}</span>
      </li>
    </ul>
</div>

< div className="mt-5 flex flex-col w-60 rounded-md border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
    <h3 className="font-urbanist font-bold text-purple-900 text-xl leading-6 mb-4">Users</h3>
    <ul className="flex flex-col gap-1 items-center pl-4">
      <li className="text-red-500 text-sm flex items-center justify-between">
        <span className="list-disc text-teal-700">&#8226;</span> Active<span className="text-red-700 rounded-full px-2">{2}</span>
      </li>
      <li className="text-blue-400 text-sm flex items-center justify-between">
        <span className="list-disc text-red-700">&#8226;</span> Inactive <span className="text-blue-700 rounded-full px-2">{5}</span>
      </li>
      
    </ul>
</div>

< div className="mt-5 flex flex-col w-60 rounded-md border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
    <h3 className="font-urbanist font-bold text-purple-900 text-xl leading-6 mb-4">Users</h3>
    <ul className="flex flex-col gap-1 items-center pl-4">
      <li className="text-red-500 text-sm flex items-center justify-between">
        <span className="list-disc text-teal-700">&#8226;</span> Active<span className="text-red-700 rounded-full px-2">{2}</span>
      </li>
      <li className="text-blue-400 text-sm flex items-center justify-between">
        <span className="list-disc text-red-700">&#8226;</span> Inactive <span className="text-blue-700 rounded-full px-2">{5}</span>
      </li>
      
    </ul>
</div>

< div className="mt-5 flex flex-col w-60 rounded-md border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out py-4 px-6">
    <h3 className="font-urbanist font-bold text-purple-900 text-xl leading-6 mb-4">Users</h3>
    <ul className="flex flex-col gap-1 items-center pl-4">
      <li className="text-red-500 text-sm flex items-center justify-between">
        <span className="list-disc text-teal-700">&#8226;</span> Active<span className="text-red-700 rounded-full px-2">{2}</span>
      </li>
      <li className="text-blue-400 text-sm flex items-center justify-between">
        <span className="list-disc text-red-700">&#8226;</span> Inactive <span className="text-blue-700 rounded-full px-2">{5}</span>
      </li>
      
    </ul>
</div>
    </div>

    



    

  
  );
};

export default AdminMiddle;
