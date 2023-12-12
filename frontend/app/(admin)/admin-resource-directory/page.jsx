"use client";

import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import { useAuth } from "@/useContext/UseContext";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

export default function ResourceDirectory() {
  const { user, login } = useAuth();
  const id = user.adminId;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Handler functions for updating the respective state values
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleConfirm = () => {
    // Handle post confirmation logic here
    const resourceData = {
      name: name,
      // address: formData.address,
      // contact: formData.contact,
      // latitude: formData.latitude,
      // longitude: formData.longitude,
    };

    // console.log(resourceData);
    // // Make a POST request to your API endpoint
    // fetch(
    //   `http://localhost:8080/resource-directory/create-resource?adminId=${id}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(resourceData),
    //   }
    // )
    //   .then((response) => {
    //     // console.log("Response:", response);
    //     return response.text(); // or response.json() depending on the expected response format
    //   })
    //   .then((body) => {
    //     console.log("Response Body:", body);
    //   })

    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });

    // setIsSuccessPopupShowing(true);

    setShowConfirmationPopup(false);
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
  };

  function handleAddResource(e) {
    e.preventDefault();
    setShowConfirmationPopup(true);
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA - KaskZFonHjwsp3fupe1ziiT3T0ZQhRA",
  });

  const differentPlaces = [
    {
      address:
        "6QH8+7XM, Natalio B. Bacalso S National Hwy, Tuyan, City of Naga, 6032 Cebu",
      contact: "63+ 9997172796",
      name: "Tuyan Barangay Hall",
      lat: "10.228189310619017",
      lng: "123.7674397299054",
    },
    {
      address: "6QH9+23P, City of Naga, Cebu",
      contact: "63+ 9085789426",
      name: "Fruitas Resort",
      lat: "10.227578680511018",
      lng: "123.76771853466501",
    },
    {
      address: "6QHC+54F, City of Naga, Cebu",
      contact: "63+ 9185233976",
      name: "Ratskii",
      lat: "10.227944576111287",
      lng: "123.77031104625871",
    },
    {
      address: "6QH9+X75, Natalio B. Bacalso Ave, City of Naga, 6037 Cebu",
      contact: "63+ 98715215454",
      name: "Tuyan Central Elementary School",
      lat: "10.22991539589692",
      lng: "123.76818849229869",
    },
    {
      address: "6QG7+PWF, City of Naga, Cebu",
      contact: "",
      name: "Our Lady of Lourdes Academy of Tuyan Inc.",
      lat: "10.226807265419101",
      lng: "123.76480487578388",
    },
    {
      address: "6QG7+PWF, City of Naga, Cebu",
      contact: "",
      name: "Our Lady of Lourdes Academy of Tuyan Inc.",
      lat: "10.226807265419101",
      lng: "123.76480487578388",
    },
  ];

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
                // value={formData.name}
                onChange={handleNameChange}
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
                // value={formData.address}
                onChange={handleAddressChange}
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
                // value={formData.contact}
                onChange={handleContactChange}
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
                // value={formData.latitude}
                onChange={handleLatitudeChange}
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
                // value={formData.longitude}
                onChange={handleLongitudeChange}
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
            {differentPlaces.map((place, index) => (
              <div
                key={index}
                className="bg-white h-40 w-full border border-gray-300 flex items-center"
                onClick={() =>
                  handleMarkerChange(
                    parseFloat(place.lat),
                    parseFloat(place.lng)
                  )
                }
              >
                <div className="flex flex-col w-full pl-5 pr-3 py-3.5 text-black gap-y-1">
                  <div className="flex flex-row w-full">
                    <div className="text-slate-600 w-10/12 ">
                      {place.address}
                    </div>
                    <div className="w-2/12 flex flex-row items-start justify-end">
                      <img
                        src="admin/edit-icon.png"
                        className="w-4 h-4 mx-1 "
                      />

                      <img
                        src="admin/delete-icon.png"
                        className="w-4 h-4 mx-1"
                      />
                    </div>
                  </div>
                  <div className="text-lg font-medium ">{place.contact}</div>
                  <div className="py-0.5 text-3xl font-bold">{place.name}</div>
                </div>
              </div>
            ))}
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
    </div>
  );
}
