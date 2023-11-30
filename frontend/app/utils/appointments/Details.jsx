import React from "react";

const Details = ({ firstTitle = "", appointmentDetails = "", handleDetails = () => {} }) => {
    return (
        <div className="flex gap-8 w-11/12 mt-5">
            <div className="flex flex-col flex-1">
                <label htmlFor="address">{firstTitle}</label>
                <textarea
                    type="text"
                    value={appointmentDetails}
                    onChange={handleDetails}
                    placeholder="Write report details..."
                    id="address"
                    name="address"
                    className="peer w-full h-28 py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    style={{ resize: "none" }}
                />
            </div>
        </div>
    );
};

export default Details;
