"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAlert() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [formattedAlertDates, setFormattedAlertDates] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    setLoading(true);
    axios
      .get('http://localhost:8080/alerts/getAllNonDeletedAlerts')
      .then((response) => {
        setAlerts(response.data);
        setFormattedAlertDates(
          response.data.map((alert) => formatDateTime(alert.alertDate))
        );
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching alerts:', error);
        setLoading(false);
      });
      
  };

  const formatDateTime = (dateArray) => {
    if (!dateArray || dateArray.length !== 6) {
      return 'Invalid Date';
    }
  
    const [year, month, day, hours, minutes, seconds] = dateArray;
    const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds);
    
    if (isNaN(formattedDate.getTime())) {
      return 'Invalid Date';
    }
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    return formattedDate.toLocaleString('en-US', options);
  };
  
  
  

  const handleCreateAlert = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth()).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    const newAlert = {
      alertTitle: title,
      alertDescription: description,
      alertDate: formattedDate,
      isDeleted: false,
    };
    console.log(newAlert.alertDate)

    axios
      .post('http://localhost:8080/alerts/createAlert', newAlert)
      .then((response) => {
        setAlerts([...alerts, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error creating alert:', error);
      });
  };

  const handleUpdateAlert = (alertId) => {
    setEditingAlert(alertId);
  };

  const handleEditSubmit = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth()).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    if (editingAlert) {
      const updatedAlert = {
        alertTitle: title,
        alertDescription: description,
        alertDate: formattedDate,
        isDeleted: false,
      };

      axios
        .put(`http://localhost:8080/alerts/updateAlert/${editingAlert}`, updatedAlert)
        .then((response) => {
          setAlerts((prevAlerts) => {
            const updatedAlerts = prevAlerts.map((alert) =>
              alert.alertId === editingAlert ? response.data : alert
            );
            return updatedAlerts;
          });
          setTitle('');
          setDescription('');
          setEditingAlert(null);
        })
        .catch((error) => {
          console.error('Error updating alert:', error);
        });
    }
  };

  const handleDeleteAlert = (alertId) => {
    axios
      .put(`http://localhost:8080/alerts/deleteAlert/${alertId}`)
      .then(() => {
        // Remove the deleted alert from the state
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.alertId !== alertId)
        );
      })
      .catch((error) => {
        console.error('Error deleting alert:', error);
      });
  };
  

  return (
    <div className="w-full">
      <header
        className="h-72 bg-cover text-black"
        style={{ backgroundImage: 'url("/images/document-request-header.png")' }}
      >
        <div className="flex flex-col justify-evenly w-full my-auto px-5 h-full">
          <h1 className="font-bold text-6xl w-full">Alerts</h1>
        </div>
      </header>
      <div className="p-5">
        <h2 className="text-2xl font-semibold">Create New Alert</h2>
        <div className="flex">
          <input
            type="text"
            className="mr-2 border border-gray-300 rounded-md p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="mr-2 border border-gray-300 rounded-md p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleCreateAlert}
          >
            Create
          </button>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-semibold">Alerts List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index} className="border-b py-2">
                <p>Title: {alert.alertTitle}</p>
                <p>Description: {alert.alertDescription}</p>
                <p>
                Date: {formatDateTime(alert.alertDate)}
                  <button
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteAlert(alert.alertId)}
                  >
                    Delete
                  </button>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {editingAlert && (
        <div className="p-5">
          <h2 className="text-2xl font-semibold">Edit Alert</h2>
          <div className="flex">
            <input
              type="text"
              className="mr-2 border border-gray-300 rounded-md p-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="mr-2 border border-gray-300 rounded-md p-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleEditSubmit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-600"
              onClick={() => setEditingAlert(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
