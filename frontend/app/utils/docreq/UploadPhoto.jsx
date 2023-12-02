import { useAuth } from "@/useContext/UseContext";
import React, { useState } from "react";

const UploadPhoto = ({ storeUploadedPhoto }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      storeUploadedPhoto(file); // Call storeUploadedPhoto with the selected file
    }
  };

  return (
    <div className="mt-6">
      <input type="file" onChange={handleFileSelect} />
    </div>
  );
};

export default UploadPhoto;
