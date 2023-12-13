import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const GoogleMapComponent = ({ isLoaded, marker }) => {
  return (
    isLoaded && (
      <GoogleMap
        center={marker}
        zoom={18}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={marker} />
      </GoogleMap>
    )
  );
};

export default GoogleMapComponent;
