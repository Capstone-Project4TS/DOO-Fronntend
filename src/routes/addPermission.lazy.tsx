import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute("/addPermission")({
  component: () => <AddPermission />,
});

import { fetchDepartment } from "../services/api/fetchDataApi";
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import RoleList from '../components/RoleList';
  function AddPermission(){
    const [department, setDepartment] = useState([]);
   const [isLoading, setIsLoading]=useState(true)
    useEffect(() => {
      getDepartment();
    }, []);

    function getDepartment(){
      fetchDepartment().then(result => {
        if(!result.isError){
          setIsLoading(false);
          console.log(result.data)
          setDepartment(result.data)
        }else{
          setIsLoading(false);
         toast.error("error fetching");
        }
        
       })
    
    }
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen bg-green-100">
          <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
        </div>
      );
    }
  
    return(
      <div className="mx-3 mb-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <SideBar />
        <div className="w-full flex flex-col">
          <NavBar />
          <div className="mt-10">
          {
       department.map((item:any, index:any)=>{
          console.log(item)
       
          return(
            <div key={index}>
          <h2 className='text-[#00B0AD] text-xl my-7 bg-slate-200 py-4 px-4'>{item.name} Department</h2>
          <RoleList departmentId={item._id} />
            </div>
          )
        })
       }
          </div>
      
        </div>
        </div>
        </div>

    )
  }
  