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
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={handleFileSelect}
          className="hidden" // Hide the default file input
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="inline-flex items-center justify-center h-12 gap-2 px-20 text-sm font-medium tracking-wide text-white transition duration-300 rounded-xl whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          Upload Photo
        </label>
        {selectedFile && (
          <span className="text-gray-500">{selectedFile.name}</span>
        )}
      </div>
    </div>
  );
};

export default UploadPhoto;
