import React from "react";

const ThirdRow = ({
  firstTitle = "",
  secondTitle = "",
  handleChange = () => {},
}) => {
  return (
    <div className="flex gap-8 w-full mt-2">
      <div className="flex flex-col">
        <label htmlFor="emailAddressId">{firstTitle}</label>
        <input
          type="email"
          id="emailAddressId"
          name="emailAddress"
          onChange={handleChange}
          className="peer relative w-[455px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="addressId">{secondTitle}</label>
        <input
          type="address"
          id="addressId"
          name="address"
          onChange={handleChange}
          className="peer relative w-[455px] h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500"
          required
        />
      </div>
    </div>
  );
};

export default ThirdRow;
