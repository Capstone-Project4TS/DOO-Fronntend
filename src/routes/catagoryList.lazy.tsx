import React, { useState, lazy, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import UserName from "../components/UserName";
import SideBar from "../components/SideBar";
import SubCatagoryView from "../components/subCatagoryView";
import { DeleteCatag, EditCatag, fetchCatag } from "../services/api/catagoryApi";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import CatagAdd from "../components/addCatagory..lazy";
export const Route = createFileRoute("/catagoryList")({
  component: () => <CatagoryList />,
});

import { DataGrid, GridColDef, GridActionsCellParams } from "@mui/x-data-grid";
import { fetchSubCatag } from "../services/api/fetchDataApi";
import { Box, Modal, Typography } from "@mui/material";

function CatagoryList() {
  const [modalData, setModalData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editCatagory, setEditCatagory] = useState(false);
  const [catagoryName, setCatagoryName] = useState("");
  const [catagoryId, setCatagoryId] = useState("");
  const [newCatagory, setNewCatagory] = useState("");
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  // const [isLoading, setIsLoading]=useState(true)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const catagoryClose = () => setEditCatagory(false);

  const openAddTemplate = () => {
    setShowAddTemplate(true);
  };

  const closeAddTemplate = () => {
    setShowAddTemplate(false);
    setReload(!reload);
  };

  const reloadCategories = async () => {
    const { data, isError, isLoading } = await fetchCatag();
    if (!isError) {
    
      const updatedUserData = data.map((category: any) => ({
        id: category._id,
        catagoryname: category.name,
      }));
      setUser(updatedUserData);
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
    reloadCategories();
  }, [reload]);

  const columns: GridColDef[] = [
    { field: "catagoryname", headerName: "catagoryname", width: 230 },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => {
        const onEdit = () => {
          setCatagoryName(params.row.catagoryname);
          setCatagoryId(params.id);
          setEditCatagory(true);
        };

        const onDelete = () => {
          DeleteCatag(params.id).then((result) => {
            if (!result.isError) {
              console.log("deleted");
              setReload(!reload);
              // toast.success("Deleted"); // Uncomment if you use toast
            } else {
              // toast.error("no subcatagories"); // Uncomment if you use toast
            }
          });
        };

        return (
          <div className="flex justify-around">
            <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
              <img src="/asset/icons/edit.png" className="w-5" />
            </button>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700">
              <img src="/asset/icons/delete.svg" className="w-5" />
            </button>
          </div>
        );
      },
    },
    {
      field: "View",
      headerName: "View Subcategories",
      width: 150,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => {
        const view = () => {
          handleOpen();
          fetchSubCatag(params.id).then((result) => {
            if (!result.isError) {
              setModalData(result.data);
            } else {
              // toast.error("no subcategories"); // Uncomment if you use toast
            }
          });
        };

        return (
          <div className="flex justify-around">
            <button onClick={view} className="border border-[#36d7b7] p-3 rounded-md text-base">
              view
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-3">
      <div className="flex mr-30 ">
        <SideBar />
        <div className="w-full flex flex-col">
          <UserName />
          <div className="mt-24">
          <div className={`flex justify-between ${showAddTemplate ? "opacity-20" : "opacity-100"}`}>
            <div className="flex flex-col gap-3 my-5 opa">
              <h2 className="text-[#4A176D] text-3xl font-bold">Catagory List</h2>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button onClick={openAddTemplate} className="flex gap-2 bg-[#00B0AD] px-4 py-2 rounded-lg text-white">
                <img src="/asset/icons/plus3.png" className="w-5" />
                Add Catagory
              </button>
            </div>
          </div>
          {showAddTemplate && <CatagAdd closePopup={closeAddTemplate} />}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="bg-white items-center justify-center absolute top-[20%] left-[30%] h-[300px] p-10 rounded-md">
              <div className="text-[#36d7b7] text-xl font-semibold ">
                SubCatagories
              </div>
              <SubCatagoryView data={modalData} onReloadData={() => setReload(!reload)} />
            </Box>
          </Modal>

          <Modal
            open={editCatagory}
            onClose={catagoryClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="bg-white items-center justify-center absolute top-[20%] left-[30%] p-10 rounded-md">
              <div className=" flex gap-4">
                <input
                  type="text"
                  placeholder={catagoryName}
                  className="border"
                  onChange={(e) => setNewCatagory(e.target.value)}
                />
                <button
                  className="bg-[#00B0AD] p-2 rounded-lg text-white"
                  onClick={() => {
                    EditCatag(catagoryId, newCatagory).then((result) => {
                      if (!result.isError) {
                        console.log("updated");
                        setReload(!reload);
                        // toast.success("Updated"); // Uncomment if you use toast
                      } else {
                        // toast.error("Failed to update"); // Uncomment if you use toast
                      }
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            </Box>
          </Modal>
          <div className={` w-full mt  ${showAddTemplate ? "opacity-20" : "opacity-100"}`}>
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
              onRowSelectionModelChange={(id) => console.log(id)}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CatagoryList;
