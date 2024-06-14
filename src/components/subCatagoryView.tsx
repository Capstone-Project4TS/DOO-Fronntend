import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellParams } from "@mui/x-data-grid";
import { Modal, Box, TextField, Button, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from "@mui/material";
import { updatesubCatag, deletesubCatag } from "../services/api/subcatagApi";

const SubCatagoryView = ({ data, onReloadData }: any) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubCatagoryName, setEditSubCatagoryName] = useState("");
  const [editSubCatagoryId, setEditSubCatagoryId] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSubCatagoryId, setDeleteSubCatagoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditOpen = (params: any) => {
    setEditSubCatagoryName(params.row.name);
    setEditSubCatagoryId(params.id);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteDialogOpen = (params: any) => {
    setDeleteSubCatagoryId(params.id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deletesubCatag(deleteSubCatagoryId);
      if (!response.isError) {
        setSnackbarMessage("Sub-category deleted successfully");
        setSnackbarSeverity("success");
        onReloadData();
      } else {
        setSnackbarMessage("Failed to delete sub-category");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditSave = async () => {
    if (!editSubCatagoryName) {
      setSnackbarMessage("Sub-category name cannot be empty");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const result = await updatesubCatag(editSubCatagoryId, { name: editSubCatagoryName });
      if (!result.isError) {
        setSnackbarMessage("Sub-category updated successfully");
        setSnackbarSeverity("success");
        setEditModalOpen(false);
        onReloadData();
      } else {
        setSnackbarMessage("Failed to update sub-category");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Sub-category Name", width: 230 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "actions",
      renderCell: (params: GridActionsCellParams<any>) => (
        <div className="flex justify-around">
          <button
            onClick={() => handleEditOpen(params)}
            className="text-blue-500 hover:text-blue-700"
          >
            <img src="/asset/icons/edit.png" className="w-5" alt="Edit" />
          </button>
          <button
            onClick={() => handleDeleteDialogOpen(params)}
            className="text-blue-500 hover:text-blue-700"
          >
            <img src="/asset/icons/delete.svg" className="w-5" alt="Delete" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <Modal open={editModalOpen} onClose={handleEditClose}>
        <Box className="bg-white p-10 rounded-md absolute top-[20%] left-[30%]">
          <Typography variant="h6" className="text-[#4A176D] mb-4">
            Edit Sub-category
          </Typography>
          <TextField
            fullWidth
            label="Sub-category Name"
            value={editSubCatagoryName}
            onChange={(e) => setEditSubCatagoryName(e.target.value)}
            variant="outlined"
          />
          <Button
            className="bg-[#00B0AD] p-2 rounded-lg text-white mt-4"
            onClick={handleEditSave}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this sub-category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubCatagoryView;
