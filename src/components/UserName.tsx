import React, { useState, useEffect } from "react";
import upArrow from "../../public/asset/icons/upload-icon.svg";
import downArrow from "/asset/icons/downArrow.svg";
import notification from "/asset/icons/notification.svg"; // Fixed typo
import avatar from "/asset/icons/avatar.svg";
import axios from "axios";
import { fetchnotification } from "../services/api/notificationAPi";
import { io, Socket } from 'socket.io-client';

const UserName: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetchnotification(userData._id);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Setup Socket.IO client
    const socket: Socket = io('http://localhost:5000', {
      path: '/socket.io',
    });

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
      socket.emit('join', userData._id);
    });

    socket.on('newNotification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });
  }, [userData._id]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    setIsNotification((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      if (response.data.message === "Logout successful") {
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <div className="search-bar flex justify-between pt-4 p-3 fixed top-0 left-80 right-0 bg-white z-20">
      <div className="flex px-3 py-2 rounded-lg w-72 h-8 justify-between"></div>
      <div className="flex gap-6 items-center">
        <div className="relative">
          <img
            src={notification}
            onClick={toggleNotification}
            className="max-w-6 cursor-pointer"
            alt="Notification Icon"
          />
          {notifications.length > 0 && (
            <div className="h-4 w-4 rounded-full bg-teal-400 text-white text-xs flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              {notifications.length}
            </div>
          )}
          {isNotification && (
            <div className="max-h-72 w-80 shadow-lg absolute bg-white right-2 flex flex-col gap-4 p-4 border border-opacity-15 overflow-auto z-30">
              {notifications.length === 0 ? (
                <div className="text-center text-sm text-teal-500">No notifications</div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index} className="flex gap-2 items-center p-2 border-b border-opacity-20">
                    <img src={avatar} className='h-8' alt="User Avatar" />
                    <div>
                      <p className="text-sm text-gray-400">
                        <a href="#" className="text-teal-400">{notification.workflowName}</a> was assigned to you
                      </p>
                    </div>
                  </div>
                ))
              )}
              {notifications.length > 0 && (
                <a href="/notification">
                  <button className="border-none h-8 text-teal-400 text-sm px-5">
                    View all notifications
                  </button>
                </a>
              )}
            </div>
          )}
        </div>
        <hr className="border border-[#EFEFF4] h-11" />
        <div className="flex gap-4 w-56 items-center">
          <div className="w-10 h-10 rounded-full border bg-slate-400 text-white flex justify-center items-center">
            {userData.username.charAt(0)}
          </div>
          <div onClick={toggleDropdown} className="flex relative gap-2 cursor-pointer">
            <p className="">{userData.username}</p>
            <img src={isOpen ? upArrow : downArrow} className="max-w-4" alt="Dropdown Arrow" />
          </div>
          {isOpen && (
            <div className="flex flex-col justify-center items-center gap-2 absolute top-14 right-2 h-auto w-44 py-4 border bg-white rounded-md shadow-lg z-30">
              <a href="/changePassword" className="w-full flex justify-center">
                <button className="border text-xs border-gray-300 w-32 py-1 text-gray-500 hover:bg-gray-100 rounded-md">
                  Change Password
                </button>
              </a>
              <button
                className="border w-32 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded-md"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserName;
