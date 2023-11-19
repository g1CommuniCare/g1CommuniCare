import React from "react";

const SecondRow = ({
    firstTitle = "",
    contactInformation = "",
    handleContactInformation = () => {},
    secondTitle = "",
    birthDate = "",
    handleBirthDate = () => {},
}) => {
    return (
        <div className="flex gap-8 w-full">
            <div className="flex flex-col">
                <label htmlFor="contactInformation">{firstTitle}</label>
                <div className="flex gap-2 w-[395px]">
                    <input
                        placeholder="+63"
                        className="px-2.5 py-1 shadow-lg rounded-lg border border-slate-200 text-lg w-[60px] mt-2"
                        readOnly
                    />
                    <input
                        type="number"
                        name="contactInformation"
                        value={contactInformation}
                        onChange={handleContactInformation}
                        className="peer relative w-full h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="birthdate">{secondTitle}</label>
                <input
                    type="date"
                    name="birthdate"
                    value={birthDate}
                    onChange={handleBirthDate}
                    className="peer relative w-[395px] h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>
        </div>
    );
};

export default SecondRow;
