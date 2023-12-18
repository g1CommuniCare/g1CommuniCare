"use client";

import ConfirmationPopup from "@/app/components/ConfirmationPopup";
import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showConfirmationDeletion, setShowConfirmationDeletion] = useState(false);
    const [showConfirmationUpload, setShowConfirmationUpload] = useState(false);
    const { user, logout } = useAuth();

    const adminId = user.adminId;
    const firstName = user.firstName;
    const fullname = firstName + " " + user.middleInitial + " " + user.lastName;
    const contactNumber = user.contactNumber;
    const email = user.email;
    // // DISPLAYS THE DEFAULT IMAGE
    // // User's fullname: Don Massimo -> DM(defualt profile image)
    const defaultProfileImage = (firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();

    function handleFileSelect(event) {
        const file = event.target.files[0];
        setSelectedFile(file);

        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
    }

    async function handleFileUpload() {
        setShowConfirmationUpload(true);
    }

    async function handleUploadProfileImage() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);
            console.log(selectedFile);
            try {
                const uploadResponse = await fetch(
                    `http://localhost:8080/admin/${user.adminId}/uploadImage`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                if (!uploadResponse.ok) {
                    throw new Error(`HTTP error! status: ${uploadResponse.status}`);
                }
                const result = await uploadResponse.text();
                console.log("Image upload successful", result);
                setShowConfirmationUpload(false);

                fetchUpdatedImage();
                // Fetch the image after successful upload
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    }

    function handleCancelProfieImage() {
        setShowConfirmationUpload(false);
    }

    const [updatedImage, setUpdatedImage] = useState("");
    async function fetchUpdatedImage() {
        const res = await axios(`http://localhost:8080/admin/getAdminById/${adminId}`);
        const data = res.data;
        setUpdatedImage(data);
    }
    // console.log("THE NEW IMAGE", updatedImage);
    // console.log("THE OLD IMAGE", user.profileImage);

    useEffect(() => {
        fetchUpdatedImage();
    }, []);

    function handleDelete() {
        setShowConfirmationDeletion(true);
    }

    async function handleConfirmDelete() {
        try {
            const res = await axios.put(`http://localhost:8080/admin/${adminId}/delete`);
            const data = res.data;

            console.log("Resident deleted successfully:", data);

            // Now, if you want to logout the user, you can call the logout function
            logout();
        } catch (error) {
            console.error("Error deleting resident:", error);
            // Handle the error as needed
        }
    }

    function handleCancelDelete() {
        setShowConfirmationDeletion(false);
    }

    function handleLogout() {
        logout();
    }

    return (
        <div className="w-screen bg-cover" style={{ backgroundImage: 'url("images/logo1 2.png")' }}>
            <>
                <div className="p-5 ml-16">
                    <h1 className="text-4xl font-bold">
                        Good day, <i>{firstName}!</i>
                    </h1>
                    <div className="flex justify-between mr-auto">
                        <p>Welcome to your profile.</p>
                        <div>
                            <button
                                onClick={handleDelete}
                                className="bg-red-800 p-2 text-xs rounded-full w-[180px] mr-5 text-white font-bold"
                            >
                                DELETE ACCOUNT
                            </button>
                            {showConfirmationDeletion && (
                                <ConfirmationPopup
                                    message={"Are you sure you want to delete your existence!?!?"}
                                    onConfirm={handleConfirmDelete}
                                    onCancel={handleCancelDelete}
                                />
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-800 p-2 text-xs rounded-full w-[113px] text-white font-bold mr-16"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-8 rounded-[22px] p-7 w-11/12 bg-slate-100/70 ml-16 mb-10">
                    <div className="relative">
                        <div className="mt-24 py-24 px-10 bg-white w-[511px] rounded-[22px] border border-emerald-100">
                            <div className="flex flex-col">
                                <ChangeProfile
                                    user={user}
                                    previewImage={previewImage}
                                    updatedImage={updatedImage}
                                    defaultProfileImage={defaultProfileImage}
                                    handleFileSelect={handleFileSelect}
                                    handleFileUpload={handleFileUpload}
                                />
                                {showConfirmationUpload && (
                                    <ConfirmationPopup
                                        message={
                                            "Are you sure you want to change your existence!?!?"
                                        }
                                        onConfirm={handleUploadProfileImage}
                                        onCancel={handleCancelProfieImage}
                                    />
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="font-semibold text-xl">{fullname}</h2>
                                <span className="text-slate-600">RES-{adminId}</span>
                            </div>
                            <div className="mt-8">
                                <span className="text-xs text-slate-600">Email</span>
                                <p className="mb-1">{email}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                            <div className="mt-8">
                                <span className="text-xs text-slate-600">Contact Number</span>
                                <p className="mb-1">{contactNumber}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

function ChangeProfile({
    previewImage,
    updatedImage,
    defaultProfileImage,
    handleFileSelect,
    handleFileUpload,
}) {
    return (
        <>
            <label className="block">
                {previewImage
                    ? previewImage && (
                          <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center">
                              <img
                                  src={previewImage}
                                  alt="Selected Image"
                                  className="h-48 w-48 rounded-full border-emerald-500 border-4"
                              />
                          </p>
                      )
                    : updatedImage &&
                      updatedImage?.map(({ adminId, imageFormat, profileImage }) => (
                          <p
                              key={adminId}
                              className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center"
                          >
                              <img
                                  src={`data:image/${imageFormat};base64,${profileImage}`}
                                  alt={defaultProfileImage}
                                  className="h-48 w-48 rounded-full border-emerald-500 border-4"
                              />
                          </p>
                      ))}

                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    onChange={handleFileSelect}
                    className="block w-full ml-28 mb-2 mt-6 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-500"
                />
            </label>
            <button
                onClick={handleFileUpload}
                className="w-[200px] mx-auto my-6 p-2 rounded-xl text-white font-bold bg-green-600 hover:bg-green-900"
            >
                Upload Image
            </button>
        </>
    );
}
