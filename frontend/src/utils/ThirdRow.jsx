import React from "react";

const ThirdRow = ({
    firstTitle = "",
    address = "",
    handleAddress = () => {},
    secondTitle = "",
    emailAddress = "",
    handleEmailAddress = () => {},
}) => {
    return (
        <div className="flex gap-8 w-full">
            <div className="flex flex-col">
                <label htmlFor="firstName">{firstTitle}</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddress}
                    className="peer relative w-[395px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastName">{secondTitle}</label>
                <input
                    type="email"
                    name="email_address"
                    value={emailAddress}
                    onChange={handleEmailAddress}
                    className="peer relative w-[395px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>
        </div>
    );
};

export default ThirdRow;
