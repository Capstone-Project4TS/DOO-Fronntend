import React, { useState, lazy, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
export const Route = createFileRoute("/workflowtemp")({
  component: () => <WorkflowTemp />,
});
const WorkFlowAddTemp = lazy(() => import("./workflowadd.lazy"));
import { DataGrid, GridColDef, GridActionsCellParams } from "@mui/x-data-grid";
import NoData from "../components/NoData";
import axios from "axios";
import {  deleteWorkflowTemplate } from "../services/api/workflowApi";
import toast, { Toaster } from "react-hot-toast";
import UserName from "../components/UserName";



function WorkflowTemp() {
  const navigate = useNavigate();
  const [reload,setReload]= useState(false)
  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", width: 270 },
    { field: "workflowName", headerName: "name", width: 330,
      renderCell: (params) => (
        <Link
          className="cursor-pointer hover:text-blue-500 "
          to={`/EditWorkflowTemp/${params.id}`}
        >
          {params.value}
        </Link>
      ),
     },
     { field: "department", headerName: "Department", width: 330},
     { field: "categoryName", headerName: "Category name", width: 230},
  { field: "subCategoryName", headerName: "Sub-Category name", width: 230},
  
    {
      field: "Edit",
      headerName: "Edit",
      width: 90,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => {
        const onEdit = () => {
          // Handle edit functionality for the specific row
          console.log("Edit button clicked for row:", params.id);
          navigate({ to: `/EditWorkflowTemp/${params.id}` });
          // Implement logic to open an edit form or modal here (consider passing data)
        };
  
        
  
        return (
          <div className="flex justify-around">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700"
            >
              <img src="/asset/icons/edit.png" className="w-5" />
            </button>
           
          </div>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => {
        
  
        const onDelete = async () => {
          // Handle delete functionality for the specific row
          console.log("Delete button clicked for row:", params.id);
          const result = await deleteWorkflowTemplate(params.id);
       
          if(!result.isError){
            toast.success(result.data.message)
            setReload(true)

          }else{
            
            toast.error(result.data.message)
            setReload(true)
          }
         
          // Implement logic to confirm and delete the row (consider user confirmation)
        };
  
        return (
          <div className="flex justify-around">
            
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              <img src="/asset/icons/delete.svg" className="w-5" />
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/admin/workflow-templates/getAll",
      withCredentials: true,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reload]);
  // const userData: any = [];
  const [user, setUser] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const options = ["Template one", "Template two", "Template three"];
  const defaultOption = options[0];
  const openAddTemplate = () => {
    setShowAddTemplate(true);
  };

  // Function to close the add template pop-up
  const closeAddTemplate = () => {
    setShowAddTemplate(false);
  };
  return (
    <div className="mx-3">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <SideBar />
        <div className="w-full flex flex-col ">
          <UserName />
          {user.length == 0 && (
            <NoData title={"Workflow Template"} openPopUp={openAddTemplate} />
          )}

          {user.length != 0 && (
            <>
              <div className="flex justify-between mt-32">
                <div className="flex flex-col gap-3 my-5">
                  <h2 className="text-[#4A176D] text-3xl font-bold">
                    Workflow Template
                  </h2>
                  
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <a
                    href="/workflowadd"
                    className="flex gap-2 bg-[#00B0AD] px-4 py-2 rounded-lg text-white"
                  >
                    <img src="/asset/icons/plus3.png" className="w-5" />
                    Add New 
                  </a>
                </div>
              </div>
              <div className="h-full w-full mt">
                <DataGrid
                  rows={user}
                  getRowId={(row) => row._id}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  // checkboxSelection
                  onRowSelectionModelChange={(id) => {
                    console.log(id);
                    // checked(id);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
