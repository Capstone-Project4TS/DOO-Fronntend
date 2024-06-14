import React from 'react'
import { Link } from '@tanstack/react-router'

const SideBar2 = () => {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) {
    return null; // Handle the case where there is no user data
  }

  const { role } = userData;
  const { permissions } = role;

  // Check for permissions
  const hasCreatePermission = permissions.includes('create-workflow');
  const hasGetAssignedPermission = permissions.includes('get-assigned');

  return (



    
    <div className="flex flex-col w-64 mx-6 mt-11 h-full fixed left-0 top-0 ">
      <div className="flex flex-col gap-12 m-0 ">
        <img src="/asset/icons/hibret2.svg" className='h-16 justify-start' />
        <hr className="border border-[#EFEFF4]" />

      </div>

      <div className="flex flex-col mt-6 gap-5">
        <div className="category1 flex flex-col justify-center ">
          <h2 className=" text-sm text-[#667085] font-bold">Category1</h2>
          <div className=" flex flex-col mt-5 gap-3 justify-center">
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/dashboard.svg" />
              <Link to='/userDashboard'  className=" text-sm text-[#667085]  [&.active]:font-bold  [&.active]:text-teal-400">Dashboard</Link>
            </div>
            {/* {hasCreatePermission&&( <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/user-management.svg" />
              <Link to="/document" className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Documents</Link>
            </div>)} */}
           
            {/* <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/report.svg" />
              <Link to='/report' className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Reports</Link>
            </div> */}
            
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/report.svg" />
              <Link to='/archiveList' className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Archive List</Link>
            </div>
          </div>
        </div>

        <div className="category2 flex flex-col justify-center ">
          <h2 className=" text-sm text-[#667085] font-bold">Workflows</h2>
        
          <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/report.svg" />
              <Link to='/FolderHierarchyRoute' className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Repository</Link>
            </div>
        
          <div className=" flex flex-col justify-center mt-5 gap-3">
            {(hasGetAssignedPermission ) && (
              <div className="flex gap-2 ">
                <img className=" max-w-4" src="/asset/icons/dashboard.svg" />
                <Link to="/assignedTome" className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Assigned To Me</Link>
              </div>
            )}
            {hasCreatePermission  && (
              <div className="flex gap-2 ">
                <img className=" max-w-4" src="/asset/icons/some-list.svg" />
                <Link to="/assignedByme" className=" text-sm text-[#667085] [&.active]:font-bold [&.active]:text-teal-400">Assigned By Me</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar2
