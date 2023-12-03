"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace {residentId} with actual resident ID.
    const residentId = 2; // Example ID
    const fetchNotifications = async () => {
      const result = await axios(`http://localhost:8080/notifications/resident/${residentId}`);
      setNotifications(result.data);
    };

    fetchNotifications();
  }, []);

  // Function to mark a notification as read
  const markAsRead = async (notificationId) => {
    // API call to mark the notification as read
    console.log(`Marking notification ${notificationId} as read`);
    // Update the state to reflect the change
    setNotifications(notifications.map((notif) => 
      notif.notificationId === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  return (
    <div className="p-4">
      {notifications.map((notif) => (
        <div
          key={notif.notificationId}
          className={`p-4 mb-2 rounded-lg ${notif.isRead ? 'bg-gray-200' : 'bg-white'} flex items-center justify-between`}
          onClick={() => markAsRead(notif.notificationId)}
        >
          <div>
            <h3 className="text-lg font-bold">{notif.title}</h3>
            <p className="text-gray-700">{notif.message}</p>
          </div>
          
        </div>
      ))}
    </div>
  );
}
