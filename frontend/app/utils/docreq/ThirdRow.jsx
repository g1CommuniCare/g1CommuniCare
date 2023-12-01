import React from "react";

const ThirdRow = ({
  firstTitle = "",
  address = "",
  handleAddress = () => {},
}) => {
  return (
    <div className="flex gap-6 mt-12">
      <div className="flex flex-col w-10/12">
        <label htmlFor="addressId">{firstTitle}</label>
        <input
          type="text"
          id="addressId"
          name="address"
          value={address}
          onChange={handleAddress}
          required
          className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>

      <div className="container h-[58px] w-2/12"></div>
    </div>
  );
};

export default ThirdRow;
