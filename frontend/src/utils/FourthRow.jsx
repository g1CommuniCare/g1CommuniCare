import React from "react";

const FourthRow = ({
    firstTitle = "",
    password = "",
    handlePassword = () => {},
    secondTitle = "",
    confirmPassword = "",
    handleConfirmPassword = () => {},
}) => {
    return (
        <div className="flex gap-8 w-[688px]">
            <div className="flex flex-col">
                <label htmlFor="firstName">{firstTitle}</label>
                <input
                    type="passowrd"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="peer relative w-[395px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <small className="mt-2">
                    It must be a combination of minimum 8 letters, numbers, and symbols.
                </small>
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastName">{secondTitle}</label>
                <input
                    type="password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    className="peer relative w-[395px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>
        </div>
    );
};

export default FourthRow;
