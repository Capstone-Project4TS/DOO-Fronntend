import React, { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import UserName from "../components/UserName";
import SideBar from "../components/SideBar";
import { fetchUser, sendUser, resendUser, activateUser, deactivateUser } from "../services/api/usersApi";
import { DataGrid, GridColDef, GridActionsCellParams } from "@mui/x-data-grid";
import { toast , Toaster  } from "react-hot-toast";

export const Route = createFileRoute("/invite-user")({
  component: () => <InviteNewUser />,
});

const useActivationButton = (initialStatus) => {
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("#00B0AD");

  useEffect(() => {
    setButtonText(initialStatus === "Activated" ? "Deactivate" : "Activate");
  }, [initialStatus]);

  return { buttonText, buttonColor };
};

const getColumns = (view, handleStatusChange, handleAction) => {
  const commonColumns = [
    { field: "username", headerName: "Username", headerClassName: 'field-header', width: 150 },
    { field: "email", headerName: "Email", headerClassName: 'field-header', width: 300 },
    { field: "status", headerName: "Status", headerClassName: 'field-header', width: 150 },
  ];

  if (view === 'all') {
    return [
      ...commonColumns,
      {
        field: 'activationStatus',
        headerName: 'Activation Status',
        width: 150,
        renderCell: (params: GridActionsCellParams<any>) => {
          const { buttonText, buttonColor } = useActivationButton(params.row.activationStatus);
          return (
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={() => handleStatusChange(params.row)}
                className="flex gap-1 px-3 py-2 mt-3 rounded-lg text-white text-sm"
                style={{ backgroundColor: '#EEE4E0', color: buttonColor }}
                disabled={params.row.loading} // Disable button while loading
              >
                <img src="/asset/icons/dot.png" className="w-3 h-3" style={{ color: buttonColor }} />
                {buttonText}
              </button>
            </div>
          );
        },
      },
    ];
  } else if (view === 'invitation') {
    return [
      ...commonColumns,
      {
        field: 'action',
        headerName: 'Action',
        width: 180,
        sortable: false,
        renderCell: (params) => {
          const buttonText = params.row.accountCreationStatus === "Sent" ? "Resend" : "Send";
          return (
            <button className="border border-red-500 px-3 py-2 mb-1 rounded-lg text-red-500 text-sm" onClick={() => handleAction(params.row)}>
              {buttonText}
            </button>
          );
        },
      },
    ];
  }
};

function InviteNewUser() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('all'); // State to track the current view
  const [loading, setLoading] = useState(false); // State to track button loading status
  const [page, setPage] = useState(0); // State for current page
  const [pageSize, setPageSize] = useState(5); // State for page size

  const fetchData = useCallback(async () => {
    try {
      const { data, isError } = await fetchUser();
      if (!isError && data && data.users) {
        const updatedData = data.users.map((user) => ({
          id: user.userId,
          username: user.username,
          email: user.email,
          status: user.status, // Add status field
          activationStatus: user.activationStatus,
          isSelected: false,
          accountCreationStatus: user.accountCreationStatus,
          loading: false, // Add loading state for each user
        }));
        setUsers(updatedData);
      } else {
        console.error('Invalid response data:', data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (row) => {
    if (row.loading) return; // Prevent multiple clicks

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === row.id ? { ...user, loading: true } : user
      )
    );

    try {
      if (row.activationStatus === "Activated") {
        await deactivateUser(row.id);
        toast.success(` ${row.username} is Deactivated.`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === row.id ? { ...user, activationStatus: "Deactivated", loading: false } : user
          )
        );
      } else {
        await activateUser(row.id);
        toast.success(` ${row.username} is Activated.`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === row.id ? { ...user, activationStatus: "Activated", loading: false } : user
          )
        );
      }
    } catch (error) {
      console.error('Error changing user status:', error);
      console.error('Request details:', error.config);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === row.id ? { ...user, loading: false } : user
        )
      );
    }
  };

  const handleAction = async (row) => {
    try {
      if (row.accountCreationStatus === "Sent") {
        await resendUser(row.username);
        toast.success(`Invitation resent to ${row.username}.`);
      } else {
        await sendUser([row.username]);
        toast.success(`Invitation sent to ${row.username}.`);
      }
      fetchData(); // Refresh data to get updated statuses
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error(`Failed to send invitation to ${row.username}.`);
    }
  };

  const sendCheckedUsers = async () => {
    try {
      const selectedUsernames = users
        .filter((row) => row.isSelected)
        .map((row) => row.username);
      await sendUser(selectedUsernames);
      toast.success(`Invitations sent to selected users.`);
    } catch (error) {
      console.error('Error sending invitations:', error);
      toast.error('Failed to send invitations to selected users.');
    }
  };

  const filteredUsers = view === 'invitation'
    ? users.filter(user => user.activationStatus === "Activated")
    : users; // No filter for 'all' view

  return (
    <div className="mx-3"> {/* Added top margin to avoid overlap */}
      <div className="flex mr-30 ">
        <SideBar />
        <div className="w-full flex flex-col">
          <UserName />
          <div className="ml-30 mt-24">
            <div className="flex justify-between">
              <div className="flex flex-col gap-3 my-5">
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
                <h2 className="text-[#4A176D] text-3xl font-bold ml-30">User Management</h2>
                <div className="flex gap-4">
                  <button onClick={() => setView('all')} className={`text-base ${view === 'all' ? 'font-bold' : ''}`}>All</button>
                  <button onClick={() => setView('invitation')} className={`text-base ${view === 'invitation' ? 'font-bold' : ''}`}>Invitation</button>
                </div>
              </div>
              {view === 'invitation' && ( // Conditionally render the "Invite" button
                <div className="flex gap-4 justify-center items-center">
                  <button className="flex gap-2 bg-[#00B0AD] px-4 py-2 rounded-lg text-white" onClick={sendCheckedUsers}>
                    <img src="/asset/icons/export.svg" className="w-5" />
                    Invite
                  </button>
                </div>
              )}
            </div>
            <div className="mt-5"> {/* Adjusted margin to create space for the content */}
              <DataGrid
                rows={filteredUsers}
                columns={getColumns(view, handleStatusChange, handleAction)}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row.id} // Corrected getRowId function
                onRowSelectionModelChange={(selectionModel) => {
                  const selectedIds = new Set(selectionModel);
                  setUsers((prevUsers) =>
                    prevUsers.map((user) => ({
                      ...user,
                      isSelected: selectedIds.has(user.id),
                    }))
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteNewUser;
