import { createLazyFileRoute, Link } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/manage-user")({
  component: () => <ManageUser />,
});
import { getUsers, useActivate } from "../services/queries/userQuery";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridRow,
  GridRowParams,
} from "@mui/x-data-grid";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import UserTabs from "../components/UserTabs";
import { Button, Stack } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 230 },
  { field: "email", headerName: "email", width: 330 },
  { field: "role", headerName: "role", width: 230 },
  { field: "activated", headerName: "activated", width: 230 },

  {
    field: "action",
    headerName: "Action",
    width: 180,
    sortable: false,

    renderCell: (params) => {
      const onClick = (e) => {
        console.log(params.row);
      };

      return (
        <div className="">
          {params.row.activated == true ? (
            <button
              className=" border border-[#00B0AD] px-5 rounded-md text-[#00B0AD] "
              onClick={onClick}
            >
              {" "}
              Deactivate
            </button>
          ) : (
            <button
              className=" border border-[#00B0AD] px-5  rounded-md text-[#00B0AD] "
              onClick={onClick}
            >
              {" "}
              activate
            </button>
          )}
        </div>
      );
    },
  },
];
function ManageUser() {
  const { mutateAsync: activate }: any = useActivate();
  async function deactivate() {
    let data = removeDuplicates(deactivatedList);

    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      let active = data[i].activated;

      const res = await activate({ id, active });
      console.log(res);
    }
  }

  function removeDuplicates(array: any) {
    const uniqueMap: any = {};

    const uniqueArray = array.filter((item: any) => {
      const serialized = JSON.stringify(item);

      if (!uniqueMap[serialized]) {
        uniqueMap[serialized] = true;
        return true;
      }

      return false;
    });

    return uniqueArray;
  }
  const { data } = getUsers();
  let deactivatedList: any = [];

  return (
    <div className="mx-3">
      <div className="flex">
        <SideBar />
        <div className="w-full flex flex-col">
          <NavBar />

          <div className="flex justify-between">
            <div className="flex flex-col gap-3 my-5">
              <h2 className="text-[#4A176D] text-3xl font-bold">
                User Management
              </h2>
              <p className="text-[#667085] text-base"> placeholder</p>
            </div>
            <div className="flex gap-4 justify-center items-center ">
              <button
                className="flex gap-2 bg-[#00B0AD] px-4 py-2 rounded-lg text-white"
                onClick={() => {
                  deactivate();
                }}
              >
                <img src="/asset/icons/export.svg" className="w-5" />
                Activate/deactivate
              </button>
            </div>
          </div>
          <UserTabs />
          {data && (
            <div className=" h-full w-full mt">
              <DataGrid
                rows={data.docs}
                columns={columns}
                getRowId={(row) => row.email}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = data.docs.filter((row: any) =>
                    selectedIDs.has(row.id.toString())
                  );
                  for (let i = 0; i < selectedRowData.length; i++) {
                    deactivatedList.push(selectedRowData[i]);
                  }
                }}
              />
            </div>
          )}
          {/* <div className="mt-32 mx-10 flex flex-col gap-10">
        {data &&
          data.docs.map((item: any) => (
            <div className="flex gap-10">
              <h1>{item.email}</h1>
              <p>{item.role}</p>
              {item.activated ? (
                <button
                  className="bg-black text-white p-5"
                  onClick={() => {
                    deactivate(item.id, item.activated);
                  }}
                >
                  {" "}
                  deactivate
                </button>
              ) : (
                <button
                  className="bg-black text-white p-5"
                  onClick={() => {
                    deactivate(item.id, item.activated);
                  }}
                >
                  activate
                </button>
              )}

              <br />
            </div>
          ))}
      </div> */}
        </div>
      </div>
    </div>
  );
}
