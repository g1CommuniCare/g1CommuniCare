"use client";
import React, { useState } from 'react';
import { useAuth } from "@/useContext/UseContext";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const {user} = useAuth();
    const id = user.adminId;
    console.log(id);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

   

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const uploadResponse = await fetch(`http://localhost:8080/admin/${user.adminId}/uploadImage`, {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error(`HTTP error! status: ${uploadResponse.status}`);
                }

                const result = await uploadResponse.text();
                console.log('Image upload successful', result);

                // Fetch the image after successful upload
                fetchImage();
            } catch (error) {
                console.error('Error uploading image', error);
            }
        }
    };

    const fetchImage = async () => {
        try {
            const imageResponse = await fetch(`http://localhost:8080/admin/${user.adminId}/image`);
            if (!imageResponse.ok) {
                throw new Error(`HTTP error! status: ${imageResponse.status}`);
            }
            const imageBlob = await imageResponse.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageURL(imageObjectURL);
            console.log(user);
        } catch (error) {
            console.error('Error fetching image', error);
        }
    };

    return (
        <div>
            <h1>Account</h1>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleFileUpload}>Upload Image</button>
            <button onClick={fetchImage}>Retrieve Image</button> {/* New button for fetching the image */}
            {imageURL && <div><img src={imageURL} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} /></div>}
        </div>
    );
}
