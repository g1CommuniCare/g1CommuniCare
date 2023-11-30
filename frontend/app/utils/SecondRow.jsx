"use client"

import React, { useState } from "react";

const SecondRow = ({
  firstTitle = "",
  secondTitle = "",
  thirdTitle = "",
  handleChange = () => {},
}) => {
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isContactInformationValid, setIsContactInformationValid] =
    useState(true);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Validate username
    const isValid = value.length >= 6 && value.length <= 30;
    setIsUsernameValid(isValid);

    // Update the form data
    handleChange(e);
  };

  const handleContactInformationChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Validate contact information
    const isValid = /^\d{10}$/.test(value);
    setIsContactInformationValid(isValid);

    // Update the form data
    handleChange(e);
  };

  return (
    <div className="flex gap-8 w-full mt-2">
      <div className="flex flex-col">
        <label htmlFor="usernameId">{firstTitle}</label>
        <input
          type="text"
          id="usernameId"
          name="username"
          onChange={handleUsernameChange}
          className={`peer relative w-[395px] h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white ${
            isUsernameValid
              ? "focus:border-emerald-500"
              : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
          } invalid:text-pink-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="contactInformationId">{secondTitle}</label>
        <div className="flex gap-3 w-1/3">
          <input
            placeholder="+63"
            className="px-2.5 py-1 shadow-lg rounded-lg border border-slate-200 text-lg w-[60px] mt-2"
            readOnly
          />
          <input
            type="number"
            id="contactInformationId"
            name="contactInformation"
            onChange={handleContactInformationChange}
            className={`peer relative w-[190px] h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white ${
              isContactInformationValid
                ? "focus:border-emerald-500"
                : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
            } invalid:text-pink-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="birthdateId">{thirdTitle}</label>
        <input
          type="date"
          id="birthdateId"
          name="birthDate"
          onChange={handleChange}
          className="peer relative w-[220px] h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          required
        />
      </div>
    </div>
  );
};

export default SecondRow;
