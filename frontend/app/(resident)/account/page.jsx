"use client";
import useFetch from "@/app/api/FetchData";
import { useAuth } from "@/useContext/UseContext";
import { useState } from "react";

export default function Account() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const { user, logout } = useAuth();
    const { data, isLoading, error } = useFetch("");

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            try {
                const uploadResponse = await fetch(
                    `http://localhost:8080/resident/${user.residentId}/uploadImage`,
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
                fetchImage();
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
        } catch (error) {
            console.error("Error fetching image", error);
        }
    };

    function handleLogout() {
        logout();
    }

    const residentId = user.residentId;
    const firstName = user.firstName;
    const fullname = firstName + " " + user.middleInitial + " " + user.lastName;
    const email = user.email;
    const birthDate = user.date.join(" / ");
    const address = user.address;
    const defaultProfileIamge = (firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();

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

                <div className="flex justify-between gap-8 rounded-[22px] p-7 bg-slate-100/70">
                    <div className="relative">
                        <p className="absolute inset-0 mx-auto inline-flex h-48 w-48 items-center justify-center rounded-full border-2 border-white bg-slate-500 text-6xl text-white">
                            {defaultProfileIamge}
                        </p>
                        <div className="mt-24 py-24 px-10 bg-white w-full rounded-[22px]">
                            <div className="flex flex-col">
                                <input type="file" onChange={handleFileSelect} />
                                <button onClick={handleFileUpload}>Upload Image</button>
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
                            <div className="text-center">
                                <h2 className="font-semibold text-xl">{fullname}</h2>
                                <span className="text-slate-600">RES-{residentId}</span>
                            </div>
                            <div className="mt-8">
                                <span className="text-xs text-slate-600">Email</span>
                                <p className="mb-1">{email}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-xs text-slate-600">Birthday</span>
                                <p className="mb-1">{birthDate}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-xs text-slate-600">Address</span>
                                <p className="mb-1">{address}</p>
                                <div className="w-full h-[1.8px] bg-slate-300/80 sm:mt-0" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-7 w-full">
                        <div className="bg-white rounded-[22px] py-6 px-8">
                            <h3 className="text-lg mb-3">My Reports</h3>
                            <div className="w-full overflow-x-auto">
                                <table
                                    className="w-full text-left table-fixed border border-separate rounded border-slate-200"
                                    cellspacing="0"
                                >
                                    <tbody>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Ayub Salas
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Agnes Sherman
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Jemma Cummings
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Jimi Cardenas
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Mateusz Tucker
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white rounded-[22px] py-6 px-8">
                            <h3 className="text-lg mb-3">My Requests</h3>
                            <div className="w-full overflow-x-auto">
                                <table
                                    className="w-full text-left table-fixed border border-separate rounded border-slate-200"
                                    cellspacing="0"
                                >
                                    <tbody>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Ayub Salas
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Agnes Sherman
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Jemma Cummings
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Jimi Cardenas
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-gray-200">
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Mateusz Tucker
                                            </td>
                                            <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Designer
                                            </td>
                                            <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-black">
                                                Carroll Group
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

function Table() {
    <div className="w-full overflow-x-auto">
        <table
            className="w-full text-left border border-separate rounded border-slate-200"
            cellspacing="0"
        >
            <tbody className="table-fixed">
                <tr className="odd:bg-gray-200">
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Ayub Salas
                    </td>
                    <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Designer
                    </td>
                    <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Carroll Group
                    </td>
                </tr>
                <tr className="odd:bg-gray-200">
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Agnes Sherman
                    </td>
                    <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Designer
                    </td>
                    <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Carroll Group
                    </td>
                </tr>
                <tr className="odd:bg-gray-200">
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Jemma Cummings
                    </td>
                    <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Designer
                    </td>
                    <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Carroll Group
                    </td>
                </tr>
                <tr className="odd:bg-gray-200">
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Jimi Cardenas
                    </td>
                    <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Designer
                    </td>
                    <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Carroll Group
                    </td>
                </tr>
                <tr className="odd:bg-gray-200">
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Mateusz Tucker
                    </td>
                    <td className="h-12 px-6 text-center text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Designer
                    </td>
                    <td className="h-12 px-6 text-right text-sm transition duration-300 border-t border-slate-200 stroke-slate-500 text-slate-500">
                        Carroll Group
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;
}
