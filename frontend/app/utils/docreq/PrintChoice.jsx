import React from "react";
import PrintOption from "./PrintOption";

const PrintChoice = ({
  toPrint,
  handlePrintOptionChange,
  printCopies,
  handlePrintCopiesChange,
  referenceNumber,
  handleReferenceNumber,
}) => {
  return (
    <div className="flex flex-col gap-5 mt-16 w-full">
      <div>
        <p>Do you want to have your document printed?</p>
        <div className="mt-3">
          <label htmlFor="printDocument" className="inline-flex items-center">
            <input
              id="printDocument"
              type="radio"
              name="printOption"
              value="yes"
              checked={toPrint}
              onChange={handlePrintOptionChange}
              className="form-checkbox h-5 w-5 text-indigo-600 transition-all duration-300 ease-in-out focus:ring focus:ring-indigo-200"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label
            htmlFor="notPrintDocument"
            className="inline-flex items-center ml-6"
          >
            <input
              id="notPrintDocument"
              type="radio"
              name="notPrintOption"
              value="no"
              checked={!toPrint}
              onChange={handlePrintOptionChange}
              className="form-checkbox h-5 w-5 text-indigo-600 transition-all duration-300 ease-in-out focus:ring focus:ring-indigo-200"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {toPrint && (
        <PrintOption
          toPrint={toPrint}
          printCopies={printCopies}
          handlePrintCopiesChange={handlePrintCopiesChange}
          referenceNumber={referenceNumber}
          handleReferenceNumber={handleReferenceNumber}
        />
      )}
    </div>
  );
};

export default PrintChoice;
