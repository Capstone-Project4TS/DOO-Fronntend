import React, { useState, lazy, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import UserName from "../components/UserName";

import "react-dropdown/style.css";

export const Route = createFileRoute("/archiveList")({
  component: () => <ArchiveList />,
});

import { DataGrid, GridColDef, GridActionsCellParams } from "@mui/x-data-grid";

import { getArchive } from "../services/api/workflowApi";
import SideBar2 from "../components/SideBar2";

function ArchiveList() {
  const [list , setList]=useState([])
  // const [isLoading, setIsLoading]=useState(true)
  const user: any = localStorage.getItem("user");
  const userId = JSON.parse(user);
  

  const reloadList = async () => {
    const { data, isError, isLoading } = await getArchive(userId);
    if (!isError) {
         const archive= data.archivedWorkflows
      setList(archive);
      console.log(data)
      // setIsLoading(false)
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-green-100">
  //       <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    reloadList();
  }, []);

  const columns: GridColDef[] = [
    { field: "workflowname", headerName: "workflowname", width: 230 },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => {
        const onEdit = () => {
         
        };

        

        return (
          <div className="flex justify-around">
            <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
              <img src="/asset/icons/edit.png" className="w-5" />
            </button>
            
          </div>
        );
      },
    },
    
  ];

  return (
    <div>
        <SideBar2 />
        <UserName />
        <div className="mt-24 ml-80 mr-8">
             <SideBar2 />
        <UserName />
          <div className={`flex justify-between `}>
            <div className="flex flex-col gap-3 my-5">
              <h2 className="text-[#4A176D] text-3xl font-bold">Document Archive List</h2>
            </div>
            
          </div>
         {list.length === 0 ? (<div className="mt-9 w-full h-96 flex flex-col items-center justify-center">
                <img
                  src="/asset/nodocument.svg"
                  alt="No Workflow Available"
                  className="w-48 h-48"
                />
                <p className="mt-4 text-gray-500">
                  There is no archived document available
                </p>
              </div>):(
                <div className={` w-full mt  `}>
            <DataGrid
              rows={list}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(id) => console.log(id)}
            />
          </div>
              )}
              
           
          
        </div>
        </div>
      
  );
}

export default ArchiveList;
