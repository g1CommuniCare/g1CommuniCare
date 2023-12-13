"use client";

import { useAuth } from "@/useContext/UseContext";

export default function Settings() {
    const { user } = useAuth();
    return (
        <div className="bg-slate-50/80 py-12 px-12 mx-auto rounded-b-3xl shadow-[0px_3px_5px_0px_#1a202c]">
            <div className="flex items-center gap-5">
                <p className="text-4xl font-bold">Profile</p>
                <span className="text-slate-400">
                    <i>Information in this section cannot be changed</i>
                </span>
            </div>
            <div className="pt-10">
                <AccountSettings
                    user={user}
                    firstName="First Name"
                    lastName="Last Name"
                    middleInitial="Middle Initial"
                    contactNumber="Contact Information"
                    date="Birthdate"
                    email="Email"
                    address="Address"
                />
            </div>
        </div>
    );
}

function AccountSettings({
    user,
    firstName,
    lastName,
    middleInitial,
    contactNumber,
    date,
    email,
    address,
}) {

    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        return { year, month, day };
    };

    const formattedDate = user ? formatDate(user.date) : null;
    
    return (
        <>
            <div className="flex gap-5 pb-10">
                <div>
                    <p className="mb-1">{firstName}</p>
                    {user && (
                        <input
                            type="text"
                            value={user.firstName}
                            readOnly
                            className="w-[343px] px-5 py-3 rounded-md border-2 shadow-md"
                        />
                    )}
                </div>
                <div>
                    <p className="mb-1">{lastName}</p>
                    {user && (
                        <input
                            type="text"
                            value={user.lastName}
                            readOnly
                            className="w-[343px] px-5 py-3 rounded-md border-2 shadow-md"
                        />
                    )}
                </div>
                <div>
                    <p className="mb-1">{middleInitial}</p>
                    {user && (
                        <input
                            type="text"
                            value={user.middleInitial}
                            readOnly
                            className="w-[100px] px-5 py-3 rounded-md border-2 shadow-md"
                        />
                    )}
                </div>
            </div>

            <div className="flex gap-5 pb-10">
                <div>
                    <p className="mb-1">{contactNumber}</p>
                    {user && (
                        <div className="flex gap-5">
                            <input
                                placeholder="+63"
                                className="w-[80px] px-5 py-3 rounded-md border-2 shadow-md"
                                readOnly
                            />
                            <input
                                type="text"
                                value={user.contactNumber}
                                readOnly
                                className="w-[245px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <p className="mb-1">{date}</p>
                    {user && (
                        <div className="flex gap-5">
                            <input
                                type="text"
                                value={formattedDate.month}
                                readOnly
                                className="w-[103px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                            <input
                                type="text"
                                value={formattedDate.day}
                                readOnly
                                className="w-[103px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                            <input
                                type="text"
                                value={formattedDate.year}
                                readOnly
                                className="w-[103px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="pb-10">
                <p>{email}</p>
                {user && (
                    <div className="flex gap-5">
                        <input
                            type="text"
                            value={user.email}
                            readOnly
                            className="w-[343px] px-5 py-3 rounded-md border-2 shadow-md"
                        />
                    </div>
                )}
            </div>

            <div className="pb-10">
                <p>{address}</p>
                {user && (
                    <div className="flex gap-5">
                        <input
                            type="text"
                            value={user.address}
                            readOnly
                            className="w-full px-5 py-3 rounded-md border-2 shadow-md"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
