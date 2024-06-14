import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const adminEnd = () => {
  const columns = [
    { field: 'name', headerName: 'Workflow Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'creationDate', headerName: 'Creation Date', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'Workflow 1', status: 'Rejected', creationDate: '2024-01-01', category: 'Category A' },
    { id: 2, name: 'Workflow 2', status: 'Approved', creationDate: '2024-02-15', category: 'Category B' },
    { id: 3, name: 'Workflow 3', status: 'Pending', creationDate: '2024-03-10', category: 'Category C' },
    // Add more rows as needed
  ];

  return (
    <div className="end flex gap-6 mt-10">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
};

export default adminEnd;
