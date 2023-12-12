"use client";

import { useAuth } from "@/useContext/UseContext";

export default function Settings() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="bg-slate-50/80 py-12 px-12 mx-auto rounded-b-3xl">
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
                    birthDate="Birth Date"
                    email="Email"
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
    birthDate,
    email,
}) {
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
                    <p className="mb-1">{birthDate}</p>
                    {user && (
                        <div className="flex gap-5">
                            <input
                                type="text"
                                value={user.lastName}
                                readOnly
                                className="w-[103px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                            <input
                                type="text"
                                value={user.lastName}
                                readOnly
                                className="w-[103px] px-5 py-3 rounded-md border-2 shadow-md"
                            />
                            <input
                                type="text"
                                value={user.lastName}
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
        </>
    );
}
