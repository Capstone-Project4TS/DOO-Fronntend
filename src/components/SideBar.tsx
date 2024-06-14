import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
const SideBar = () => {
  return (

    
    <div className="flex flex-col w-64  ml-4 mt-4  h-full">
      <div className="flex flex-col gap-10">
      <img src="/asset/icons/hibret2.svg" className='h-12 w-56 ' />
        <hr className="border border-[#EFEFF4] -mb-4" />
      </div>

      <div className="flex flex-col mt-6 gap-5">
        <div className="category1 flex flex-col justify-center ">
          <h2 className=" text-sm text-[#667085] font-bold">Catagory1</h2>
          <div className=" flex flex-col mt-5 gap-3 justify-center">
            <div className="flex gap-2 ">
            <img className=" max-w-4" src="/asset/icons/dashboard.svg" />
              <Link to="/adminDashboard" className=" text-sm text-[#667085] [&.active]:font-bold">Dashboard</Link>
            </div>
            <div className="flex gap-2 ">
              <img
                className=" max-w-4"
                src="/asset/icons/user-management.svg"
              />
              <Link to="/invite-user" className=" text-sm text-[#667085] [&.active]:font-bold">User Management</Link>
              
            </div>
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/report.svg" />
              <Link to="/report" className=" text-sm text-[#667085]">Report</Link>
            </div>

            
          </div>
        </div>

        <div className="category2 flex flex-col justify-center ">
          <h2 className=" text-sm text-[#667085] font-bold">Catagory2</h2>
          <div className=" flex flex-col justify-center mt-5 gap-3">
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/dashboard.svg" />
              <Link to="/documentemp" className=" text-sm text-[#667085] [&.active]:font-bold">Document Template</Link>
            </div>
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/some-list.svg" />
              <Link to="/workflowtemp" className=" text-sm text-[#667085] [&.active]:font-bold">Workflow Template</Link>
            </div>
            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/category-list.svg" />
              <Link to="/catagoryList" className=" text-sm text-[#667085]">Category List</Link>
            </div>

            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/category-list.svg" />
              <Link to="/addPermission" className=" text-sm text-[#667085]">Role persmission List</Link>
            </div>

            <div className="flex gap-2 ">
              <img className=" max-w-4" src="/asset/icons/category-list.svg" />
              <Link to="/commitee" className=" text-sm text-[#667085]">Commitee</Link>
            </div>
          </div>
        </div>

       
      
      </div>
    </div>
  );
};

export default SideBar;
