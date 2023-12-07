"use client";

import { useState } from "react";
import CopySvg from "@/app/utils/CopySvg";
import SuccessPopup from "@/app/utils/SuccessPopUp";

export default function AppointmentRequestDetails({ data, fullName }) {

  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [approveDetails, setApproveDetails] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const [isSuccessPopupShowing, setIsSuccessPopupShowing] = useState(false);

  const [showDenyPopup, setShowDenyPopup] = useState(false);
  const [denyReason, setDenyReason] = useState('');

  function handleCopy() {
    alert("COPIIIIIIIIIIIIIIIIIIIIIIIIIED");
  }

  const handleApprove = () => {
    setShowApprovePopup(true);
  }

  const handleDeny = () => {
    setShowDenyPopup(true);
  }

  function handleSuccessPopupConfirm() {
    setIsSuccessPopupShowing(false);
    setIsShowing(false); // Optionally close the registration modal as well
}

  const handleApproveSubmit = async () => {
    // Send an API fetch request to update approved details
    const response = await fetch(`http://localhost:8080/appointment-requests/update-approved-details/${data.appreqId}?approvedDetails=${approveDetails}`, {
      method: 'PUT',
    });
    const result = await response.text();
    setShowApprovePopup(false); // Close the Approve popup after submission
    setIsSuccessPopupShowing(true);
  };

  const handleDenySubmit = async () => {
    // Send an API fetch request to update denial reason
    const response = await fetch(`http://localhost:8080/appointment-requests/update-denial-reason/${data.appreqId}?denialReason=${denyReason}`, {
      method: 'PUT',
    });
    const result = await response.text();
    setShowDenyPopup(false); // Close the Deny popup after submission
    setIsSuccessPopupShowing(true);
  };

  return (
    <div className="flex flex-col w-full p-5">
      <div className="w-[950px] bg-gray-200/80 rounded-2xl mx-auto p-5">
        <div className="flex justify-between gap-8">
          <div className="w-[515px] bg-white rounded-2xl">
            <h1 className="text-xs text-gray-400 p-3">Resident Information</h1>
            <div className="px-8 pt-1 pb-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 leading-3">
                    Resident ID:
                  </p>
                  <p className="pb-2 font-medium">
                    RES-{data.resident.residentId}
                  </p>
                </div>
                <CopySvg handleCopy={handleCopy} />
              </div>
              <>
                <p className="text-xs text-gray-500 leading-3">Name:</p>
                <p className="pb-2 font-medium">{fullName}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Email:</p>
                <p className="pb-2 font-medium">{data.email}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">
                  Contact Information:
                </p>
                <p className="pb-2 font-medium">{data.contactNumber}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Address Line</p>
                <p className="font-medium">{data.address}</p>
              </>
            </div>
          </div>
          <div className="w-[515px] bg-white rounded-2xl">
            <h1 className="text-xs text-gray-400 p-3">Resident Information</h1>
            <div className="px-8 pt-1 pb-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 leading-3">Appointment ID:</p>
                  <p className="pb-2 font-medium">APP-{data.appreqId}</p>
                </div>
                <CopySvg handleCopy={handleCopy} />
              </div>
              <>
                <p className="text-xs text-gray-500 leading-3">
                  Day of Request:
                </p>
                <p className="pb-2 font-medium">{data.dateRequested}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Department:</p>
                <p className="pb-2 font-medium">{data.department}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Purpose:</p>
                <p className="pb-2 font-medium">{data.purpose}</p>
              </>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-full bg-white rounded-2xl">
            <h1 className="text-xl font-bold text-center p-5">
              APPOINTMENT DETAILS
            </h1>
            <div className="w-11/12 bg-gray-200/80 rounded-2xl mx-auto p-5 mb-6">
              <div className="flex flex-row mb-4 mx-16">
                <div className="flex flex-col items-start">
                  <div>
                    <p className="text-xs text-gray-500">Date and Time:</p>
                    <p className="pb-2 font-medium">{data.meetingDate}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-60 flex-grow">
                  <div>
                    <p className="text-xs text-gray-500">Meeting Format:</p>
                    <p className="pb-2 font-medium">{data.meetingFormat}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-9/12 mx-16">
                <p className="text-xs text-gray-500 w-6/12">Details:</p>
                <p className="pb-2 font-medium">{data.appointmentDetails}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleApprove}
          className="bg-[#3F948B] hover:bg-[#337770] w-[148px] text-sm text-white p-2 rounded-lg mt-8 mr-6"
        >
          Approve
        </button>
        <button
          onClick={handleDeny}
          className="bg-[#F57E77] hover:bg-[#ac5853] w-[148px] text-sm text-white p-2 rounded-lg"
        >
          Deny
        </button>
        {showApprovePopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl z-50">
            <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
              Set Approved Appointment Details
            </h3>
            <div className="mt-2 text-center">
              <textarea
                value={approveDetails}
                onChange={(e) => setApproveDetails(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-md p-2"
                placeholder="Enter Approved Details"
              ></textarea>
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowApprovePopup(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleApproveSubmit}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F948B] hover:bg-[#337770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3F948B]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDenyPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl z-50">
            <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
              Indicate Denial Reasons
            </h3>
            <div className="mt-2 text-center">
              <textarea
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-md p-2"
                placeholder="Enter Denial Reasons"
              ></textarea>
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => setShowDenyPopup(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleDenySubmit}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#F57E77] hover:bg-[#ac5853] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F57E77]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSuccessPopupShowing && (
                <SuccessPopup
                    title="Request Updated!"
                    message="Appointment status has been updated successfully!"
                    onConfirm={handleSuccessPopupConfirm}
                    onCancel={() => setIsSuccessPopupShowing(false)}
                    btnMessage="Close"
                />
            )}
      </div>
    </div>
  );
}
