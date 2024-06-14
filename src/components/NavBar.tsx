import React, { useState, useEffect } from "react";
import axios from "axios";
import notifcation from "/asset/icons/notification.svg";
import avatar from "/asset/icons/avatar.svg";

import { fetchnotification } from "../services/api/notificationAPi";
import { io, Socket } from 'socket.io-client';

const NavBar: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  console.log(userData)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response =   await fetchnotification (userData._id);;
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

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <div className="search-bar flex justify-between mt-11 p-3 self-end">
      {/* <div className="flex border border-[#667085] px-3 py-2 rounded-lg ">
        <input type="text" placeholder="Search something...." />
        <img src="/asset/icons/search.svg" alt="Search" />
      </div> */}

      <div className="flex gap-6 items-center ">
        <div className="relative">
          <img
            src={notifcation}
            onClick={toggleNotification}
            className="max-w-6 cursor-pointer"
            alt="Notification Icon"
          />
          {notifications.length > 0 && (
            <div className="h-4 w-4 rounded-full bg-teal-400 text-white text-xs flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              {notifications.length}
            </div>
          )}
          {isNotificationOpen && (
            <div className="max-h-72 w-80 shadow-lg absolute bg-white right-2 flex flex-col gap-4 p-4 border border-opacity-15 overflow-auto">
              {notifications.slice(0, 5).map((notification, index) => (
                <div key={index} className="flex gap-2 items-center p-2 border-b border-opacity-20">
                  <img src={avatar} className="h-8" alt="User avatar" />
                  <div>
                    <p className="text-sm text-gray-400">
                      <a href="#" className="text-teal-400">{notification.message}</a>
                    </p>
                  </div>
                </div>
              ))}
              <a href="/notification">
                <button className="border-none h-8 text-teal-400 text-sm px-5">
                  View all notifications
                </button>
              </a>
            </div>
          )}
        </div>

        <hr className="border border-[#EFEFF4] h-11" />
        <div className="flex gap-4 w-56 items-center">
          <div className="w-10 h-10 rounded-full border bg-slate-400 text-white flex justify-center items-center">
            {userData.username.charAt(0)}
          </div>
          <div className="flex gap-2">
            <p>{userData.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
