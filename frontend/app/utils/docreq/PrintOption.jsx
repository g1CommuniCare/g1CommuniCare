import React from "react";

const PrintOption = ({
  toPrint,
  printCopies,
  handlePrintCopiesChange,
  referenceNumber,
  handleReferenceNumber,
}) => {
  return (
    <div>
      <div className="mt-1">
        <p>If you choose to have it printed, how many copies would you like?</p>
        <div className="flex flex-col w-5/12">
          <label htmlFor="printCopiesId" className="mb-1"></label>
          <input
            type="number"
            id="printCopiesId"
            name="printCopies"
            value={printCopies}
            onChange={handlePrintCopiesChange}
            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
      </div>
      <div className="mt-3">
        <p>Document Pricing:</p>
        <table className="w-full border-collapse border border-slate-200 mt-3">
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-200 p-2">Document Type</th>
              <th className="border border-slate-200 p-2">Pricing</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="border border-slate-200 p-2">
                Barangay Clearance
              </td>
              <td className="border border-slate-200 p-2">Php 100.00</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">Barangay ID</td>
              <td className="border border-slate-200 p-2">Php 150.00</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">
                Certificate of Indigency
              </td>
              <td className="border border-slate-200 p-2">Php 50.00</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">Barangay Permit</td>
              <td className="border border-slate-200 p-2">Php 500.00</td>
            </tr>
            <tr>
              <td className="border border-slate-200 p-2">Others</td>
              <td className="border border-slate-200 p-2">Php 200.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <div>
          To proceed with document printing, submit the payment through GCash to
          the following number:
        </div>
        <div className="flex flex-row gap-5 items-center px-10 py-3 w-3/4">
          <img src="images/GCash-Logo.png" alt="Gcash-Logo" className="w-36" />
          <div className="flex flex-col text-lg font-semibold">
            <div className="italic text-xl font-bold">Juan dela Cruz Jr.</div>
            <div>09123456789</div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-1">Reference Number (if any):</p>
        <input
          type="text"
          value={referenceNumber}
          onChange={handleReferenceNumber}
          placeholder="Reference Number"
          className="w-5/12 h-[48px] py-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
      </div>
    </div>
  );
};

export default PrintOption;
