import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@tanstack/react-router";

import { ownerWork } from "../services/api/ownerWorkApi";

import UserName from "../components/UserName";
import SideBar2 from "../components/SideBar2";
import {
  fetchWorkflowName,
  getRequiredDocument,
  fetchDraft
} from "../services/api/workflowApi";
import toast from "react-hot-toast";
import axios from "axios";

export const Route = createLazyFileRoute("/assignedbyme")({
  component: () => {
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);

    const userId = userData._id;
    const [workflowData, setWorkflowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All"); // State to manage selected tab
    const [showPopUp, setShowPopUp] = useState(false);
    const [workflow, setWorkflow] = useState([]);
    const [draftData, setDraftData] = useState([])
    const [selectedWorkflow, setSelectedWorkflow] = useState("");

    let opacity;

    showPopUp ? (opacity = "opacity-30") : (opacity = "opacity-100");

    function openPopUp() {
      setShowPopUp(true);
    }
    function closePopUp() {
      setShowPopUp(false);
    }

    function handleChange(e: any) {
      console.log(e.target.value);
      setSelectedWorkflow(e.target.value);
    }

    function getDocument() {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:5000/admin/workflow-templates/requiredDoc/${selectedWorkflow}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          const dat = response.data;
          const ress = dat.documents.flat();
          console.log(JSON.stringify(ress));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    useEffect(() => {
      fetchWorkflowName().then((result) => {
        if (!result.isError) {
          console.log(result.data);
          setWorkflow(result.data);
        } else {
          toast.error("error fetching");
        }
      });
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await ownerWork(userId);
          console.log(result)
          setWorkflowData(result.data || []);
          setIsLoading(false);
          setIsError(result.isError);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };
      fetchDraftWorkflow()
      fetchData();
    }, [userId]);

          function fetchDraftWorkflow(){
            fetchDraft(userId).then((result) => {
              if (!result.isError) {
                console.log(result.data);
                setDraftData(result.data);
              } else {
                toast.error("error fetching");
              }
            });
          }
 
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen bg-green-100">
          <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
        </div>
      );
    }

    const columns = [
      {
        field: "workflowName",
        headerName: "Name",
        width: 200,
        renderCell: (params) => (
          <Link
            className="cursor-pointer text-blue-500 underline"
            to={`/assignedbymedetails/${params.row.id}`}
          >
            {params.value}
          </Link>
        ),
      },

      { field: 'categoryName', headerName: 'Category', width: 200 },
      { field: 'subCategoryName', headerName: 'Sub Category', width: 200 },
      { field: 'status', headerName: 'Document Status', width: 200 },
      { 
        field: 'Edit', 
        headerName: 'Edit document', 
        width: 200,
        renderCell: (params) => (
          <Link
            className="cursor-pointer text-blue-500 underline"
            to={`EditDocument/${params.row.id}/0`}
          >
            {params.value}
          </Link>
        ),
      },


    ];

    const draftColumns = [
      {
        field: "workflowName",
        headerName: "Name",
        width: 200,
        renderCell: (params) => (
          <Link
            className="cursor-pointer text-blue-500 underline"
            to={`/FinishWorkflow/${params.row.id}/0`}
          >
            {params.value}
          </Link>
        ),
      },

      { field: 'categoryName', headerName: 'Category', width: 200 },
      { field: 'subCategoryName', headerName: 'Sub Category', width: 200 },
      
    


    ];

    // Filter rows based on selected tab
    const filteredRows = workflowData
      .filter((workflow) => {
        if (selectedTab === "All") return true;
        if (selectedTab === "Ongoing") return workflow.status === "Pending";
        if (selectedTab === "Completed") return workflow.status === "Approved";
        return true;
      })
      .map((workflow) => ({
        id: workflow._id,
        workflowName: workflow.workflowName,
        categoryName: workflow.categoryName,
        subCategoryName: workflow.subCategoryName,
        status: workflow.status,
        date: workflow.createdAt

      }));

    return (
      <div>
        <SideBar2 />
        <UserName />
        <div className="mt-24 ml-80 mr-8">
          <div className="flex gap-4 mb-9 ml-4 text-sm">
            <p
              className={`cursor-pointer ${
                selectedTab === "All"
                  ? "border-b-4 rounded-xs border-gray-600"
                  : ""
              }`}
              onClick={() => setSelectedTab("All")}
            >
              All
            </p>
            <p
              className={`cursor-pointer ${
                selectedTab === "Ongoing"
                  ? "border-b-4 rounded-xs border-gray-600"
                  : ""
              }`}
              onClick={() => setSelectedTab("Ongoing")}
            >
              Ongoing
            </p>
            <p
              className={`cursor-pointer ${
                selectedTab === "Completed"
                  ? "border-b-4 rounded-xs border-gray-600"
                  : ""
              }`}
              onClick={() => setSelectedTab("Completed")}
            >
              Completed
            </p>
          </div>
          <div className={`flex flex-row justify-between ${opacity}`}>
            <button
              className="flex gap-2  px-4 py-2 rounded-lg text-[#00B0AD] items-center border-2 border-[#00B0AD]"
              onClick={() => {
                openPopUp();
              }}
            >
              Add
              <img
                src="/asset/icons/arrowDown.svg"
                className="w-5 text-white h-4"
              />
            </button>
          </div>

          {showPopUp && (
            <div className="w-full h-full max-w-[665px] absolute top-56 right-96 bg-white z-20 ">
              <div className=" flex gap-4 items-center my-7">
                <button onClick={closePopUp}>
                  <img src="asset/icons/back-arrow.svg" />
                </button>

                <h2 className=" text-[#4A176D] text-3xl font-bold">
                  Add New Document
                </h2>
              </div>

              <div className="flex flex-col gap-6 w-full p-6">
                <div className=" flex flex-col gap-3">
                  <h2 className="text-[#00B0AD] text-xl font-bold">
                    Choose Workflow Type
                  </h2>
                  <select
                    id="document-type"
                    className="text-[#667085] text-sm border border-[#D0D5DD] border-dashed rounded-md px-3 py-2"
                    onChange={handleChange}
                  >
                    <option>
                      <img src="/icons/select-icon.svg" />
                      Select Workflow Type
                    </option>
                    {workflow?.map((option: any, index) => (
                      <option
                        key={index}
                        label={option.workflowName}
                        value={option._id}
                      />
                    ))}
                  </select>
                </div>

                <a
                  href={`LoanDocument/${selectedWorkflow}/${0}`}
                  className={` text-base px-6 py-2 self-end ${
                    selectedWorkflow != null
                      ? "bg-[#00B0AD] text-white"
                      : "bg-[#F0F3F6] text-[#9EA9C1]"
                  }`}
                >
                  <button onClick={getDocument}>Continue</button>
                </a>
              </div>
            </div>
          )}
          <div className={opacity}>
            {filteredRows.length === 0 ? (
              <div className="mt-9 w-full h-96 flex flex-col items-center justify-center">
                <img
                  src="/asset/nodocument.svg"
                  alt="No Workflow Available"
                  className="w-48 h-48"
                />
                <p className="mt-4 text-gray-500">
                  There is no workflow available
                </p>
              </div>
            ) : (
              <div className="mt-9 w-full h-96">
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick // Disable row selection on click
                  components={{
                    NoRowsOverlay: () => (
                      <div className="flex justify-center items-center h-full">
                        <p className="text-gray-400">No rows</p>
                      </div>
                    ),
                  }}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      fontSize: "0.875rem", // 14px
                      color: "#9CA3AF", // Gray-400
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      fontSize: "0.875rem", // 14px
                    },
                  }}
                />
              </div>
            )}
          </div>

          <div className="my-4">
            <h2 className="text-[#00B0AD] text-3xl font-bold"> Drafts</h2>

            <div className={opacity}>
            {draftData.length === 0 ? (
              <div className="mt-9 w-full h-96 flex flex-col items-center justify-center">
                <img
                  src="/asset/nodocument.svg"
                  alt="No Workflow Available"
                  className="w-48 h-48"
                />
                <p className="mt-4 text-gray-500">
                  There is no Draft available
                </p>
              </div>
            ) : (
              <div className="mt-9 w-full h-96">
                <DataGrid
                  rows={draftData}
                  columns={draftColumns}
                  pageSize={10}
                  disableSelectionOnClick // Disable row selection on click
                  components={{
                    NoRowsOverlay: () => (
                      <div className="flex justify-center items-center h-full">
                        <p className="text-gray-400">No rows</p>
                      </div>
                    ),
                  }}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      fontSize: "0.875rem", // 14px
                      color: "#9CA3AF", // Gray-400
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      fontSize: "0.875rem", // 14px
                    },
                  }}
                />
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    );
  },
});
