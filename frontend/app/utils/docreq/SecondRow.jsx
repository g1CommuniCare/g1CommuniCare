import React, { useState } from "react";

const SecondRow = ({
  firstTitle = "",
  contactNumber = "",
  handlecontactNumber = () => {},
  secondTitle = "",
  email = "",
  handleEmail = () => {},
}) => {
  const [iscontactNumberValid, setIscontactNumberValid] = useState(true);

  const handlecontactNumberChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Validate contact information
    const isValid = /^\d{10}$/.test(value);
    setIscontactNumberValid(isValid);

    // Update the form data
    handlecontactNumber(e);
  };

  return (
    <div className="flex gap-8 mt-5">
      <div className="container h-[58px] w-5/12">
        <div className="flex flex-col flex-1">
          <label htmlFor="contactNumber">{firstTitle}</label>
          <div className="flex flex-row gap-2 ">
            <input
              placeholder="+63"
              className="px-2.5 py-1 rounded-md text-lg w-3/12 mt-2 text-center"
              readOnly
            />
            <input
              type="number"
              id="contactNumberId"
              name="contactNumber"
              value={contactNumber}
              onChange={handlecontactNumberChange}
              className={`peer relative w-10/12 h-[58px] py-1 px-4 mt-2 shadow-lg rounded-lg border border-slate-200 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white ${
                iscontactNumberValid
                  ? "focus:border-emerald-500"
                  : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
              } invalid:text-pink-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              required
            />
          </div>
        </div>
      </div>

      <div className="container h-[58px] w-5/12">
        <div className="flex flex-col flex-1">
          <label htmlFor="email">{secondTitle}</label>
          <input
            type="email"
            id="emailId"
            name="email"
            value={email}
            onChange={handleEmail}
            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            required
          />
        </div>
      </div>

      <div className="container h-[58px] w-2/12"></div>
    </div>
  );
};

export default SecondRow;
