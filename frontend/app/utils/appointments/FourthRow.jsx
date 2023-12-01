import React from "react";

// REUSE THIS CODE FOR DOCUMENT REQUEST AND APPOINTMENTS
const FourthRow = ({
    firstTitle = "",
    department = "",
    handleSelectDepartment = () => {},
    departmentTypes = [],
    secondTitle = "",
    purpose = "",
    handlePurpose = () => {},
}) => {
    return (
        <div className="flex gap-8 mt-6 ">
          <div className="h-[58px] w-5/12 ">
            <div className="flex flex-col flex-1">
              <label htmlFor="contactInformation">{firstTitle}</label>
              <div className="flex gap-2">
                <select
                  value={department}
                  onChange={handleSelectDepartment}
                  className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  name="document-type"
                >
                  {departmentTypes.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="h-[58px] w-5/12 ">
            <div className="flex flex-col flex-1">
              <label htmlFor="purpose">{secondTitle}</label>
              <input
                type="text"
                value={purpose}
                onChange={handlePurpose}
                id="purpose"
                name="purpose"
                className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>
          <div className="h-[58px] w-2/12 "></div>
        </div>
      );
    };
    
    export default FourthRow;
    