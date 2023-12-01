import React from "react";

export default function PopUp({ approvedData, handleYes, handleNo, showModal }) {
    const userId = approvedData.userId;
    const firstName = approvedData.firstName;

    const modalStyle = showModal ? "block" : "hidden";
    const blurBackground = showModal ? "blur-xl" : "";

    return (
        <>
            <div className={`bg-slate-300/70 ${blurBackground} fixed inset-0 `}></div>
            <div
                className={`flex flex-col items-center rounded-lg bg-white p-8 shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${modalStyle}`}
            >
                <img src="/images/logo.png" alt="CommuniCare Logo" />
                <h2 className="mt-2 text-lg font-bold">
                    Are you sure you want to Approve{" "}
                    <span className="text-green-600 underline">{firstName}</span>?
                </h2>

                <p className="mt-5 text-sm text-gray-500">
                    Doing that could have caused some issues elsewhere, are you 100% sure it's OK?
                </p>

                <div className="mt-5 flex gap-4">
                    <button
                        type="button"
                        onClick={handleYes}
                        className="rounded bg-gray-200 hover:bg-green-200 px-4 py-2 text-sm font-medium hover:text-green-600"
                    >
                        Yes, I'm sure
                    </button>

                    <button
                        type="button"
                        onClick={handleNo}
                        className="rounded bg-gray-200 hover:bg-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black"
                    >
                        No, go back
                    </button>
                </div>
            </div>
        </>
    );
}
