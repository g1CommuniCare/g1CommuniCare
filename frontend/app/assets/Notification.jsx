import React from "react";

const Notification = () => {
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
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />{" "}
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
    );
};

export default Notification;
