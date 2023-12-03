// utility.jsx

import React from "react";
import UploadPhoto from "@/app/utils/docreq/UploadPhoto";

const FifthRow = ({
  firstTitle = "",
  validIdType = "",
  handleValidIdType = () => {},
  validIdTypes = [],
  storeUploadedPhoto = () => {},
  specifiedValidIdType = "", // New state for Specify Document Type
  handleSpecifiedValidIdType = () => {}, // New handler for Specify Document Type
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-8 mt-14">
        <div className=" h-[58px] w-5/12">
          <div className="flex flex-col flex-1">
            <label htmlFor="validIdType">{firstTitle}</label>
            <div className="flex gap-2">
              <select
                value={validIdType}
                onChange={handleValidIdType}
                className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                name="validIdType"
              >
                {validIdTypes.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className=" h-[58px] w-5/12 mt-1">
          <div className="flex flex-row items-end gap-5">
            {/* Pass the UploadPhoto component with its respective props */}
            <UploadPhoto storeUploadedPhoto={storeUploadedPhoto} />
          </div>
          <div className="flex flex-col mt-2 flex-1 items-center justify-end">
            <i className="text-xs">
              *Please ensure that you bring this ID with you as your ID will be
              used for verification purposes.
            </i>
          </div>
        </div>
        <div className=" h-[58px] w-2/12"></div>
      </div>

      {validIdType === "others" && (
        <div className="flex gap-8 mt-14">
          <div className=" h-[58px] w-5/12 ">
            <label htmlFor="specifiedValidIdType">Specify Valid ID Type</label>
            <input
              type="text"
              value={specifiedValidIdType} // Use the new state here
              onChange={handleSpecifiedValidIdType} // Use the new handler here
              id="specifiedValidIdType"
              name="specifiedDocumentType"
              className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          <div className="h-[58px] w-5/12 "></div>
          <div className=" h-[58px] w-2/12 "></div>
        </div>
      )}
    </div>
  );
};

export default FifthRow;
