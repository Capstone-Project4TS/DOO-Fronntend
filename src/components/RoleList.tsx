// src/components/RoleList.js
import React, { useEffect, useState } from "react";

import PermissionButton from "../components/PermissionButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import PermissionButton from './PermissionButton';
// import MassAddPermission from './MassAddPermission';
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { addPermission, removePermission } from "../services/api/permission";
import toast from "react-hot-toast";
import { fetchRole } from "../services/api/fetchDataApi";

const columns: GridColDef[] = [
  // { field: "_id", headerName: "ID", width: 230 },
  { field: "roleName", headerName: "role", width: 330 },
  { field: "permissions", headerName: "permission", width: 230 },
  {
    field: "action",
    headerName: "Action",
    width: 330,

    sortable: false,

    renderCell: (params) => {
      const existingList = params.row.permissions;
      const allowedPermission = ["create-workflow", "get-assigned"];
      const removeList = existingList.filter((value: any) =>
        allowedPermission.includes(value)
      );
      const addList = allowedPermission.filter(
        (value: any) => !existingList.includes(value)
      );

      console.log(params.row);

      function removePermissions(e: any) {
        // const permission = [e.target.value];
        // console.log(permission, "perm");
        // console.log(e.target.value, params.row._id);
        removePermission(e.target.value, params.row._id).then((result) => {
          if (!result.isError) {
            console.log(result.data);
            // window.location.reload();
          } else {
            toast.error("error fetching");
          }
        });
      }

      function addPermissions(e: any) {
        const permission = [e.target.value];
        console.log(e.target.value, params.row._id);
        addPermission(permission, params.row._id).then((result) => {
          if (!result.isError) {
            console.log(result.data);
            window.location.reload();
          } else {
            toast.error("error fetching");
          }
        });
      }

      return (
        <div className="">
          {params.row.permissions.length > 0 ? (
            <div className="flex gap-3 ">
              <select
                className=" border border-[#00B0AD] px-3 py-4 rounded-md bg-white text-[#00B0AD] "
                onChange={removePermissions}
              >
                <option value="">remove</option>
                {removeList.map((item: any, index: any) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <select
                className=" border border-[#00B0AD] px-3 py-4 rounded-md bg-white text-[#00B0AD] "
                onChange={addPermissions}
              >
                <option value="">add</option>
                {addList.map((item: any, index: any) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
          ) : (
            <select
              className=" border border-[#00B0AD] px-3 py-4 rounded-md bg-white text-[#00B0AD] "
              onChange={addPermissions}
            >
              <option value="">add</option>
              {addList.map((item: any, index: any) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          )}
        </div>
      );
    },
  },
];
const RoleList = ({ departmentId }: any) => {
  const [roles, setRoles] = useState([]);
  console.log(departmentId);
  useEffect(() => {
    const fetchData = async () => {
      fetchRole(departmentId).then((result) => {
        console.log(result.data);
        if (result.data.length > 0) {
          console.log(result.data);
          setRoles(result.data);
        } else {
          console.log(result.data);
        }
      });
    };
    fetchData();
  }, [departmentId]);

  return (
    <div className="h-full">
      <DataGrid
        rows={roles}
        getRowId={(row) => row._id}
        columns={columns}
        rowHeight={80}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection

        onRowSelectionModelChange={(ids) => {
          console.log(ids);
        }}
      />
    </div>
  );
};

export default RoleList;
