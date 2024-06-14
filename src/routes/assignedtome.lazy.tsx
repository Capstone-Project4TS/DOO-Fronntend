import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { workuser } from "../services/api/userworkApi";
import SideBar2 from "../components/SideBar2";
import UserName from "../components/UserName";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NavBar from "../components/NavBar";

export const Route = createFileRoute("/assignedtome")({
  component: () => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const userId = userData._id;
    
    return <AssignWork userId={userId} />;
  },
});

function AssignWork({ userId }) {
  const [user, setUser] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [acceptanceStatus, setAcceptanceStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await workuser(userId);
      console.log(response);
      const updatedUserData = response.data.map((item, index) => {
        return {
          id: item.workflowId || `unknown-${index}`,  // Ensure unique id for DataGrid
          workflow_id: item.workflowId || "Unknown",
          name: item.name || "Unnamed Workflow",
          status: item.status || "Unknown",
        };
      });
      setUser(updatedUserData);
    } catch (error) {
      console.error("Error fetching user workflow data:", error);
    }
  };

  const handleRowClick = (row) => {
    setAcceptanceStatus(null);
  };

  const handleAccept = () => {
    setAcceptanceStatus("Accepted");
    console.log("Document accepted");
  };

  const handleReject = () => {
    setAcceptanceStatus("Rejected");
    console.log("Document rejected");
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setAcceptanceStatus(null);
  };

  const columns: GridColDef[] = [
    // {
    //   field: "workflow_id",
    //   headerName: "Workflow ID",
    //   width: 230,
     
    // },
    { field: "name", headerName: "Name", width: 230,
      renderCell: (params) => (
        params.value !== "Unknown" ? (
          <Link to={`/assignedtomedetails/${params.row.id}/${userId}`}>
            {params.value}
          </Link>
        ) : (
          <span>Unknown</span>
        )
      ),
     },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      type: 'actions',
      renderCell: (params: GridActionsCellParams<any>) => {
        const onEdit = () => {
          console.log('Edit button clicked for row:', params.id);
        };

        const onDelete = () => {
          console.log('Delete button clicked for row:', params.id);
        };

        return (
          <div className="flex justify-around">
            <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
              <img src="/asset/icons/edit.png" className="w-5 h-5" />
            </button>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700">
              <img src="/asset/icons/delete.svg" className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex">
      <SideBar2 />
      <div className="flex flex-col w-full ml-64">
        <UserName />
        <div className="flex flex-col mt-16 ml-8">
          <div className="flex flex-col gap-3 my-5">
            <h2 className="text-[#4A176D] text-3xl font-bold">Assigned workflow</h2>
            <p className="text-[#667085] text-base"> placeholder</p>
          </div>
          <div className=" w-full  ">
            <DataGrid
              rows={user}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              getRowId={(row) => row.workflow_id} // Use workflow_id as row identifier
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignWork;
