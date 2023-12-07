"use client";

import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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
                // Fetch the image after successful upload
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
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

    function handleLogout() {
        logout();
    }

    return (
        <div
            className="h-screen w-screen bg-cover"
            style={{ backgroundImage: 'url("images/logo1 2.png")' }}
        >
            <>
                <div className="p-5 ml-16">
                    <h1 className="text-4xl font-bold">
                        Good day, <i>{firstName}!</i>
                    </h1>
                    <div className="flex justify-between mr-auto">
                        <p>Welcome to your profile.</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-800 p-2 text-xs rounded-full w-[113px] text-white font-bold mr-16"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-8 rounded-[22px] p-7 w-11/12 h-[850px] bg-slate-100/70 ml-16">
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
            <button onClick={handleFileUpload} className="mb-6">
                Upload Image
            </button>
        </>
    );
}
