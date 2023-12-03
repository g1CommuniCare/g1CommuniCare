"use client";

import { useAuth } from "@/useContext/UseContext";
import { useState } from "react";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [updateImage, setUpdateImage] = useState(null);
    const { user, logout } = useAuth();

    function handleFileSelect(event) {
        setSelectedFile(event.target.files[0]);
    }

    async function handleFileUpload() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

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
                // fetchImage();
            } catch (error) {
                console.error("Error uploading image", error);
            }
        }
    }

    // async function fetchImage() {
    //     try {
    //         const imageResponse = await fetch(`http://localhost:8080/admin/${user.adminId}/image`);
    //         if (!imageResponse.ok) {
    //             throw new Error(`HTTP error! status: ${imageResponse.status}`);
    //         }
    //         const imageBlob = await imageResponse.blob();
    //         const imageObjectURL = URL.createObjectURL(imageBlob);
    //         setImageURL(imageObjectURL);

    //         console.log(imageResponse);
    //         console.log(imageObjectURL);

    //         return imageObjectURL;
    //     } catch (error) {
    //         console.error("Error fetching image", error);
    //     }
    // }

    function handleLogout() {
        logout();
    }

    const adminId = user.adminId;
    const firstName = user.firstName;
    const fullname = firstName + " " + user.middleInitial + " " + user.lastName;
    const contactNumber = user.contactNumber;
    const email = user.email;

    // DISPLAYS THE DEFAULT IMAGE
    // User's fullname: Don Massimo -> DM(defualt profile image)
    const defaultProfileIamge = (firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    const noProfile = `data:image/${user.imageFormat === null};base64,${user.profileImage === null}`;
    const profile = `data:image/${user.imageFormat};base64,${user.profileImage}`;
    console.log(noProfile);
    console.log(profile);

    console.log(user);

    return (
        <div
            className="w-full p-8"
            style={{ backgroundImage: 'url("images/profileBackgroundImage.png")' }}
        >
            <>
                <div className="p-5">
                    <h1 className="text-4xl">
                        Good day, <i>{firstName}!</i>
                    </h1>
                    <div className="flex justify-between mr-auto">
                        <p>Welcome to your profile.</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-800 p-2 text-xs rounded-full w-[113px] text-white font-bold"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-8 rounded-[22px] p-7 bg-slate-100/70">
                    <div className="relative">
                        {!noProfile ? (
                            <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center rounded-full border-2 border-white bg-slate-500 text-6xl text-white">
                                {noProfile}
                            </p>
                        ) : (
                            <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center">
                                <img src={profile} alt="" className="h-48 w-48 rounded-full" />
                            </p>
                        )}
                        <div className="mt-24 py-24 px-10 bg-white w-full rounded-[22px]">
                            <div className="flex flex-col">
                                <ChangeProfile
                                    imageURL={imageURL}
                                    handleFileSelect={handleFileSelect}
                                    handleFileUpload={handleFileUpload}
                                    profile={profile}
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

function ChangeProfile({ handleFileSelect, handleFileUpload }) {
    return (
        <>
            <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    onChange={handleFileSelect}
                    className="block w-full mx-auto text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
            </label>
            <button onClick={handleFileUpload}>Upload Image</button>
        </>
    );
}
