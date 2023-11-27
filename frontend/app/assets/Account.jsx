import React from "react";

const Account = () => {
    return (
        <svg
            className="h-7 w-7 text-blue-900"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" />{" "}
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
    );
};

export default Account;
