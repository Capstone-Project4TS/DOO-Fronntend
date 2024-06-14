import { createLazyFileRoute } from '@tanstack/react-router';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import SideBar2 from '../components/SideBar2';
import UserName from '../components/UserName';
import avatar from '../../public/asset/icons/avatar.svg';
import { io, Socket } from 'socket.io-client';
import { fetchnotification  } from "../services/api/notificationAPi";
export const Route = createLazyFileRoute('/notification')({
  component: () => {
    const [notifications, setNotifications] = useState([]);

  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  console.log(userData)

  useEffect(() => {
    const fetchNotifications = async () => {
      console.log(userData._id)
      try {
        const response = await fetchnotification (userData._id);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Initialize Socket.IO client with proper URL
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
  }, []);

console.log(notifications)
  return (
    <div className="mt-36 ml-80 mr-8 w-full h-full">
      <h1 className="text-teal-400 text-2xl">Notifications</h1>
      <div className="shadow-lg w-7/12 flex flex-col gap-4 px-12 py-6 border border-opacity-15 mt-6">
        {notifications.length === 0 ? (
          <div className="text-center text-sm text-gray-700">No notifications</div>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="flex gap-2 items-center p-2 border-b border-opacity-20">
              <img src={avatar} className="h-8" alt="User avatar" />
              <div>
                <p className="text-sm text-gray-400">
                  <a href={`/EditDocument/${notification.workflowId}/0`} className="text-teal-400">{notification.message}</a>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  },
});
