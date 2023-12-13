"use client";

import { useAuth } from "@/useContext/UseContext";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

export default function ResourceDirectory() {
    const { user, login } = useAuth();
    const id = user.residentId;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyA - KaskZFonHjwsp3fupe1ziiT3T0ZQhRA",
    });

    const differentPlaces = [
        {
            address: "6QH8+7XM, Natalio B. Bacalso S National Hwy, Tuyan, City of Naga, 6032 Cebu",
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

    return (
        <div className="w-full h-full bg-slate-100">
            {/* Header */}
            <div className="h-96 w-full">
                <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
                    <h1 className="font-bold text-6xl">Resource Directory</h1>
                    <span className="flex justify-center font-small text-lg mt-2 mr-96">
                        Discover a centralized hub for essential resources in our barangay. From
                        emergency contacts to local businesses, educational institutions, and
                        healthcare services, access a comprehensive guide to everything our
                        community has to offer. Your go-to resource for local information.
                    </span>
                </div>
            </div>

            <div className="flex flex-row  h-[850px] w-full mx-auto mb-8 gap-x-9 px-9">
                {/* right column */}
                <div className=" h-full w-2/5">
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
                                    handleMarkerChange(parseFloat(place.lat), parseFloat(place.lng))
                                }
                            >
                                <div className="flex flex-col px-5 py-3.5 text-black gap-y-1">
                                    <div className="text-slate-600">{place.address}</div>
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
        </div>
    );
}
