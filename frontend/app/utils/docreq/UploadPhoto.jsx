import { useAuth } from "@/useContext/UseContext";
import React, { useState } from "react";

const UploadPhoto = ({ storeUploadedPhoto }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const { user } = useAuth();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const uploadResponse = await fetch(
          `http://localhost:8080/document-requests/${user.residentId}/uploadValidId`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(`HTTP error! status: ${uploadResponse.status}`);
        }

        const result = await uploadResponse.text();
        console.log(result);

        // Pass the selectedFile to the parent component
        storeUploadedPhoto(selectedFile);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const fetchImage = async () => {
    try {
      const imageResponse = await fetch(
        `http://localhost:8080/resident/${user.residentId}/image`
      );
      if (!imageResponse.ok) {
        throw new Error(`HTTP error! status: ${imageResponse.status}`);
      }
      const imageBlob = await imageResponse.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageURL(imageObjectURL);
      console.log("Thats so fetch! Fetched Successfully!");
    } catch (error) {
      console.error("Error fetching image", error);
    }
  };

  return (
    <div className="mt-6">
      <input type="file" onChange={handleFileSelect} />
      {/* Remove the button for manual upload */}
      <button onClick={handleFileUpload} className="mr-5">
        Upload Image
      </button>
      <button onClick={fetchImage}>Retrieve Image</button>{" "}
      {/* New button for fetching the image */}
      {imageURL && (
        <div>
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
