"use client";

import CopySvg from "@/app/utils/CopySvg";

export default function ReportDetails({ data, fullName }) {
  function handleCopy() {
    alert("COPIIIIIIIIIIIIIIIIIIIIIIIIIED");
  }

  function handleApprove() {
    alert("APROOOOOOOOOOOOVEDDDDDDD");
  }

  function handleDeny() {
    alert("DENIIIIIIIIIIIIIIIIIIIIIIIED");
  }
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
                  <p className="text-xs text-gray-500 leading-3">Request ID:</p>
                  <p className="pb-2 font-medium">REP-{data.repfilId}</p>
                </div>
                <CopySvg handleCopy={handleCopy} />
              </div>
              <>
                <p className="text-xs text-gray-500 leading-3">
                  Date Reported:
                </p>
                <p className="pb-2 font-medium">{data.dateReported}</p>
              </>
              <>
                <p className="text-xs text-gray-500 leading-3">Report Type:</p>
                <p className="pb-2 font-medium">{data.reportType}</p>
              </>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-full bg-white rounded-2xl">
            <h1 className="text-xl font-bold text-center p-5">
              REPORT DETAILS
            </h1>
            <div className="w-11/12 bg-gray-200/80 rounded-2xl mx-auto p-5 mb-6">
              <div className="flex flex-row mb-4 mx-16">
                <div className="flex flex-col items-start">
                  <div>
                    <p className="text-xs text-gray-500">Date and Time:</p>
                    <p className="pb-2 font-medium">{data.reportDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-9/12 mx-16">
                <p className="text-xs text-gray-500 w-6/12">Details:</p>
                <p className="pb-2 font-medium">{data.reportDetails}</p>
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
      </div>
    </div>
  );
}
