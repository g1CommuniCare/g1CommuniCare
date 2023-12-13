"use client";

import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import UpdateResource from "@/app/utils/UpdateResource";
import { useAuth } from "@/useContext/UseContext";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

export default function ResourceDirectory() {
  const { user, login } = useAuth();
  const id = user.adminId;

  const initialState = {
    name: "",
    address: "",
    contact: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/resource-directory/get-all-non-deleted-resources"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch resources: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false);
  const [resourceIdToUse, setResourceIdToUse] = useState(null);

  const ModalOverlay = ({ children }) => (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-200 bg-opacity-40">
      {children}
    </div>
  );

  const [isEditing, setIsEditing] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedContact, setEditedContact] = useState("");
  const [editedLatitude, setEditedLatitude] = useState("");
  const [editedLongitude, setEditedLongitude] = useState("");

  const handleConfirm = async () => {
    try {
      // Handle post confirmation logic here
      const resourceData = {
        resourceName: formData.name,
        resourceAddress: formData.address,
        resourceContact: formData.contact,
        resourceLatitude: formData.latitude,
        resourceLongitude: formData.longitude,
      };

      console.log(resourceData);

      const response = await fetch(
        `http://localhost:8080/resource-directory/create-resource?adminId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resourceData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add resource: ${response.status} - ${response.statusText}`
        );
      }

      const responseBody = await response.text(); // or response.json() depending on the expected response format
      console.log("Response Body:", responseBody);

      // setIsSuccessPopupShowing(true);
      setShowConfirmationPopup(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  function handleAddResource(e) {
    e.preventDefault();
    setShowConfirmationPopup(true);
  }

  function handleDeleteResource(e, resourceId) {
    e.preventDefault();
    setResourceIdToUse(resourceId);
    setDeleteConfirmationPopup(true);
  }

  async function handleConfirmDelete() {
    try {
      const response = await fetch(
        `http://localhost:8080/resource-directory/${resourceIdToUse}/delete-resource`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete resource: ${response.status} - ${response.statusText}`
        );
      }

      // Handle any additional logic after successful deletion

      setDeleteConfirmationPopup(false);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  }

  function handleCancelDelete(e) {
    setDeleteConfirmationPopup(false);
  }

  function handleUpdateResource(e, resourceId) {
    e.preventDefault();
    setResourceIdToUse(resourceId);

    // Find the resource being edited based on resourceId
    const resourceBeingEdited = resources.find(
      (resource) => resource.resourceId === resourceId
    );

    // Populate the editedName state with the name of the resource being edited
    setEditedName(resourceBeingEdited.resourceName);
    setEditedAddress(resourceBeingEdited.resourceAddress);
    setEditedContact(resourceBeingEdited.resourceContact);
    setEditedLatitude(resourceBeingEdited.resourceLatitude);
    setEditedLongitude(resourceBeingEdited.resourceLongitude);

    setIsEditing(true);
  }

  function handleConfirmEdit(e) {
    e.preventDefault();
    setConfirmUpdate(true);
  }

  async function handleEdit() {
    try {
      const editedResourceData = {
        resourceName: editedName,
        resourceAddress: editedAddress,
        resourceContact: editedContact,
        resourceLatitude: editedLatitude,
        resourceLongitude: editedLongitude,
      };

      const response = await fetch(
        `http://localhost:8080/resource-directory/update-resource/${resourceIdToUse}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedResourceData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update resource: ${response.status} - ${response.statusText}`
        );
      }

      // Handle any additional logic after successful update
      setIsEditing(false); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA - KaskZFonHjwsp3fupe1ziiT3T0ZQhRA",
  });

  const createMarker = (lat, lng) => ({
    lat,
    lng,
  });

  const [marker, setMarker] = useState({ lat: 10.228227, lng: 123.767438 });
  const handleMarkerChange = (lat, lng) => {
    setMarker(createMarker(lat, lng));
  };

  const [isAddResourceVisible, setAddResourceVisibility] = useState(false);
  const toggleAddResourceVisibility = () => {
    setAddResourceVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="w-full h-full px-9 bg-slate-100">
      {/* Header */}
      <div className="h-20 w-full mt-5">
        <div className="flex justify-center flex-col my-auto h-full">
          <h1 className="font-bold text-6xl">Resource Directory</h1>
        </div>
      </div>

      {/* Add Resource */}

      <button
        className="bg-white h-10 w-full border border-gray-300  my-2"
        onClick={toggleAddResourceVisibility}
      >
        <span className="text-sm flex items-start px-5  italic">
          {isAddResourceVisible ? "Hide form" : "Add a resource..."}
        </span>
      </button>

      {isAddResourceVisible && (
        <div className="bg-white h-60 w-full my-2 border border-gray-300 ">
          <div className="flex flex-col h-full w-full my-1 px-8 py-3 items-center">
            <div className="flex flex-row h-4/6 w-full ">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Name
              </div>
              <input
                id="name"
                name="name"
                placeholder="Name "
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Address
              </div>
              <input
                id="address"
                name="address"
                placeholder="Address"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Contact
              </div>
              <input
                id="contact"
                name="contact"
                placeholder="Contact"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Latitude
              </div>
              <input
                id="latitude"
                name="latitude"
                type="number"
                placeholder="Latitude"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-row h-4/6 w-full">
              <div className=" h-full w-2/12 pl-10 flex items-center text-sm ">
                Longitude
              </div>
              <input
                id="longitude"
                name="longitude"
                type="number"
                placeholder="Longitude"
                className="h-full w-10/12 flex resize-none px-1 focus:border-transparent outline-none items-center"
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row justify-end items-end h-4/6 w-full pr-10">
              <button
                className="h-full w-2/12 bg-green-600 text-white rounded-3xl my-1"
                onClick={handleAddResource}
              >
                <span className="text-sm">Add Resource</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row h-[850px] w-full mx-auto mt-5 mb-8 gap-x-9">
        {/* right column */}
        <div className=" h-full w-2/5 ">
          {/* Search */}
          <div className="bg-white h-[50px] w-full rounded-3xl flex items-center border border-black">
            <span className="px-5">Search</span>
          </div>

          {/* Directory */}
          <div className="flex flex-col h-[785px] gap-3 mt-4 overflow-auto">
            {resources.length === 0 ? (
              <div className="text-center text-gray-500 font-semibold italic">
                No Resources Found
              </div>
            ) : (
              resources.map((resource) => (
                <div
                  key={resource.resourceId}
                  className="bg-white h-40 w-full border border-gray-300 flex items-center"
                  onClick={() =>
                    handleMarkerChange(
                      parseFloat(resource.resourceLatitude),
                      parseFloat(resource.resourceLongitude)
                    )
                  }
                >
                  <div className="flex flex-col w-full pl-5 pr-3 py-3.5 text-black gap-y-1">
                    <div className="flex flex-row w-full">
                      <div className="text-slate-600 w-10/12 ">
                        {resource.resourceAddress}
                      </div>
                      <div className="w-2/12 flex flex-row items-start justify-end">
                        <img
                          src="admin/edit-icon.png"
                          className="w-4 h-4 mx-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) =>
                            handleUpdateResource(e, resource.resourceId)
                          }
                        />

                        <img
                          src="admin/delete-icon.png"
                          className="w-4 h-4 mx-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) =>
                            handleDeleteResource(e, resource.resourceId)
                          }
                        />
                      </div>
                    </div>
                    <div className="text-lg font-medium ">
                      {resource.resourceContact}
                    </div>
                    <div className="py-0.5 text-3xl font-bold pr-1">
                      {resource.resourceName}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* left column */}
        <div className="bg-white h-full w-3/5 border border-slate-300">
          {/* Google Maps */}
          {isLoaded && (
            <GoogleMap
              center={marker}
              zoom={20}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={marker} />
            </GoogleMap>
          )}
        </div>
      </div>

      {showConfirmationPopup && (
        <ConfirmationPopup
          message="Are you sure you want to add this resource?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {deleteConfirmationPopup && (
        <ConfirmationPopup
          message="Are you sure you want to add this resource?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isEditing && (
        <ModalOverlay>
          <div
            className="w-4/12 rounded-3xl border border-emerald-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 transform scale-100 transition-transform ease-in-out duration-300"
            role="alert"
          >
            <div className="flex items-center gap-4">
              <p className="font-bold text-xl sm:text-3xl mb-4">
                Edit Local Resource
              </p>
            </div>

            <div className="mt-4 w-full">
              <div className="flex flex-col gap-y-5 w-full">
                <div>
                  <label
                    htmlFor="editedName"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="editedName"
                    name="editedName"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editedAddress"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    id="editedAddress"
                    name="editedAddress"
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editedContact"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Contact Information:
                  </label>
                  <input
                    type="text"
                    id="editedContact"
                    name="editedContact"
                    value={editedContact}
                    onChange={(e) => setEditedContact(e.target.value)}
                    className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <div className="flex flex-row gap-x-3 w-full">
                  <div className="w-1/2">
                    <label
                      htmlFor="editedLatitude"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Latitude:
                    </label>
                    <input
                      type="text"
                      id="editedLatitude"
                      name="editedLatitude"
                      value={editedLatitude}
                      onChange={(e) => setEditedLatitude(e.target.value)}
                      className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="editedLongitude"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Longitude:
                    </label>
                    <input
                      type="text"
                      id="editedLongitude"
                      name="editedLongitude"
                      value={editedLongitude}
                      onChange={(e) => setEditedLongitude(e.target.value)}
                      className="peer relative w-full h-[58px] py-1 mt-0.5 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 -500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEdit}
                  className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}

      {confirmUpdate && (
        <ConfirmationPopup
          message="Are you sure you want to save resource changes?"
          onConfirm={handleEdit}
          onCancel={setConfirmUpdate(false)}
        />
      )}
    </div>
  );
}
