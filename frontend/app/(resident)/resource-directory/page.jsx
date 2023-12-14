"use client";

import GoogleMapComponent from "@/app/utils/admin/resource-directory/GoogleMapComponent";
import SearchInput from "@/app/utils/admin/resource-directory/SearchInput";
import ResourceList from "@/app/utils/resource-directory/ResidentResourceList";
import { useAuth } from "@/useContext/UseContext";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function ResourceDirectory() {
    const { user, login } = useAuth();
    const id = user.adminId;

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
            field?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

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
        <div className="w-full h-full">
            {/* Header */}
            <header className="h-96 w-full bg-cover text-black">
                <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
                    <h1 className="font-bold text-6xl">Resource Directory</h1>
                    <span className="flex justify-center font-small text-lg mt-2 mr-96">
                        Discover a centralized hub for essential resources in our barangay. From
                        emergency contacts to local businesses, educational institutions, and
                        healthcare services, access a comprehensive guide to everything our
                        community has to offer. Your go-to resource for local information.
                    </span>
                </div>
            </header>

            {/* right column */}
            <div className="flex flex-row h-[850px] w-full mx-auto mt-5 mb-8 gap-x-9 px-9">
                <div className=" h-full w-2/5">
                    <SearchInput
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                    />

                    <ResourceList
                        filteredResources={filteredResources}
                        handleMarkerChange={handleMarkerChange}
                    />
                </div>

                {/* left column */}
                <div className="bg-white h-full w-3/5 border border-slate-300">
                    <GoogleMapComponent isLoaded={isLoaded} marker={marker} />
                </div>
            </div>
        </div>
    );
}
