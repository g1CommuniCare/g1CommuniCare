"use client";

import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import AddResource from "@/app/utils/admin/resource-directory/AddResource";
import EditResourceModal from "@/app/utils/admin/resource-directory/EditResourceModal";
import GoogleMapComponent from "@/app/utils/admin/resource-directory/GoogleMapComponent";
import ResourceList from "@/app/utils/admin/resource-directory/AdminResourceList";
import SearchInput from "@/app/utils/admin/resource-directory/SearchInput";
import { useAuth } from "@/useContext/UseContext";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

export default function ResourceDirectory() {
  const { user, login } = useAuth();
  const id = user.adminId;

  const [resourceIdToUse, setResourceIdToUse] = useState(null);

  // Create Local Resource
  const [isAddResourceVisible, setAddResourceVisibility] = useState(false); // toggle button to add resource
  const toggleAddResourceVisibility = () => {
    setAddResourceVisibility((prevVisibility) => !prevVisibility);
  };

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

  function handleAddResource(e) {
    e.preventDefault();
    setShowConfirmationPopup(true);
  }

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

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

      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      setResources((prevResources) => [...prevResources, responseBody]);

      setAddResourceVisibility(false);
      setShowConfirmationPopup(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Read Local Resources
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

  // Search Resource
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredResources = resources.filter((resource) => {
    const searchFields = [
      resource.resourceName,
      resource.resourceAddress,
      resource.resourceContact,
    ];

    return searchFields.some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Update Local Resource
  const [isEditing, setIsEditing] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedContact, setEditedContact] = useState("");
  const [editedLatitude, setEditedLatitude] = useState("");
  const [editedLongitude, setEditedLongitude] = useState("");

  function handleUpdateResource(e, resourceId) {
    e.preventDefault();
    setResourceIdToUse(resourceId);

    const resourceBeingEdited = resources.find(
      (resource) => resource.resourceId === resourceId
    );

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

      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource.resourceId === resourceIdToUse
            ? { ...resource, ...editedResourceData }
            : resource
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating resource:", error);
    }

    setConfirmUpdate(false);
  }

  // Delete Local Resource
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false);

  function handleCancelDelete(e) {
    setDeleteConfirmationPopup(false);
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

      setResources((prevResources) =>
        prevResources.filter(
          (resource) => resource.resourceId !== resourceIdToUse
        )
      );

      setDeleteConfirmationPopup(false);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  }

  // Google Maps Implementation
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA - KaskZFonHjwsp3fupe1ziiT3T0ZQhRA",
  });

  const createMarker = (lat, lng) => ({
    lat,
    lng,
  });

  const [marker, setMarker] = useState({ lat: 10.228227, lng: 123.767438 }); // coordinate changer
  const handleMarkerChange = (lat, lng) => {
    setMarker(createMarker(lat, lng));
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
      <AddResource
        isAddResourceVisible={isAddResourceVisible}
        toggleAddResourceVisibility={toggleAddResourceVisibility}
        handleChange={handleChange}
        handleAddResource={handleAddResource}
      />

      {/* right column */}
      <div className="flex flex-row h-[850px] w-full mx-auto mt-5 mb-8 gap-x-9">
        <div className=" h-full w-2/5">
          <SearchInput
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />

          <ResourceList
            filteredResources={filteredResources}
            handleMarkerChange={handleMarkerChange}
            handleUpdateResource={handleUpdateResource}
            handleDeleteResource={handleDeleteResource}
          />
        </div>

        {/* left column */}
        <div className="bg-white h-full w-3/5 border border-slate-300">
          <GoogleMapComponent isLoaded={isLoaded} marker={marker} />
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

      <EditResourceModal
        isEditing={isEditing}
        editedName={editedName}
        setEditedName={setEditedName}
        editedAddress={editedAddress}
        setEditedAddress={setEditedAddress}
        editedContact={editedContact}
        setEditedContact={setEditedContact}
        editedLatitude={editedLatitude}
        setEditedLatitude={setEditedLatitude}
        editedLongitude={editedLongitude}
        setEditedLongitude={setEditedLongitude}
        setIsEditing={setIsEditing}
        confirmUpdate={confirmUpdate}
        setConfirmUpdate={setConfirmUpdate}
        handleEdit={handleEdit}
      />
    </div>
  );
}
