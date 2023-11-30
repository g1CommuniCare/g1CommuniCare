import React from "react";

const Submit = () => {
    return (
        <button
            type="submit"
            className="inline-flex items-center justify-center h-12 gap-2 px-20 text-sm font-medium tracking-wide text-white transition duration-300 rounded-xl whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none mt-8"
        >
            Submit
        </button>
    );
};

export default Submit;
