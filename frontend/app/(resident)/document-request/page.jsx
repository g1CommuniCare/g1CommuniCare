"use client";
import { useState } from "react";

import FifthRow from "@/app/utils/docreq/FifthRow";
import FirstRow from "@/app/utils/docreq/FirstRow";
import FourthRow from "@/app/utils/docreq/FourthRow";
import SecondRow from "@/app/utils/docreq/SecondRow";
import Submit from "@/app/utils/docreq/Submit";
import Success from "@/app/utils/docreq/Success";
import ThirdRow from "@/app/utils/docreq/ThirdRow";
import { useAuth } from "@/useContext/UseContext";

export default function DocumentRequest() {
  const { user, login } = useAuth();
  const id = user.residentId;
  console.log("resident id: ", id);

  const [firstName, setFirstName] = useState("");
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const [lastName, setLastName] = useState("");
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const middleInitialInput = 4;
  const [middleInitial, setMiddleInitial] = useState("");
  const handleMiddleInitial = (e) => {
    const input = e.target.value;

    if (input.length > middleInitialInput) {
      alert("Input should be 4 characters or less.");
    } else {
      setMiddleInitial(input);
    }
  };

  const [contactNumber, setcontactNumber] = useState("");
  const handlecontactNumber = (e) => {
    setcontactNumber(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [address, setAddress] = useState("");
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const [documentType, setDocumentType] = useState("");
  const handleDocumentType = (e) => {
    setDocumentType(e.target.value);
  };
  const documentTypes = [
    { value: "", label: "" },
    { value: "barangayclearance", label: "Barangay Clearance" },
    { value: "barangayid", label: "Barangay ID" },
    { value: "certificateOfIndigency", label: "Certificate of Indigency" },
    { value: "businessPermit", label: "Business Permit" },
  ];

  const [purpose, setPurpose] = useState("");
  const handlePurpose = (e) => {
    setPurpose(e.target.value);
  };

  const [validIdType, setValidIdType] = useState("");
  const handleValidIdType = (e) => {
    setValidIdType(e.target.value);
  };

  const validIdTypes = [
    { value: "", label: "" },
    { value: "driverslicense", label: "Driver's License" },
    { value: "governmentissuedid", label: "Government Issued ID" },
    { value: "passport", label: "Passport" },
    { value: "schoolid", label: "School ID" },
  ];

  const [validId, setValidId] = useState(null);
  const storeUploadedPhoto = (photo) => {
    setValidId(photo);
  };

  console.log("validId: ", validId);

  const [toPrint, setToPrint] = useState(false);
  const handlePrintOptionChange = (e) => {
    if (e.target.value === "yes") {
      setToPrint(true);
    } else {
      setToPrint(false);
    }
  };

  const [printCopies, setPrintCopies] = useState(0);
  const handlePrintCopiesChange = (e) => {
    setPrintCopies(e.target.value);
  };

  const [referenceNumber, setReferenceNumber] = useState("");
  const handleReferenceNumber = (e) => {
    setReferenceNumber(e.target.value);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validIdBytes = null;
    let imgFormat = null;

    if (validId != null) {
      // Convert the image to bytes
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;

        // Determine the image format (e.g., JPEG, PNG)
        if (typeof result === "string") {
          // If the result is a data URL
          const mimeType = result.split(";")[0].split(":")[1];
          imgFormat = mimeType.split("/")[1];
        } else if (result instanceof ArrayBuffer) {
          // If the result is an ArrayBuffer
          validIdBytes = new Uint8Array(result);
        }

        console.log("validIdBytes: ", validIdBytes);
        console.log("imgFormat: ", imgFormat);
      };

      reader.readAsDataURL(validId); // Use readAsDataURL to handle both data URLs and ArrayBuffers
    } else {
      alert("Please upload a valid ID.");
      return;
    }

    const dataDocumentRequest = {
      firstName: firstName,
      lastName: lastName,
      middleInitial: middleInitial,
      email: email,
      contactNumber: contactNumber,
      address: address,
      documentType: documentType,
      documentStatus: "Pending",
      requestDate: new Date(),
      purpose: purpose,
      validId: validIdBytes,
      imageFormat: imgFormat,
      toPrint: toPrint,
      printCopies: printCopies,
      referenceNumber: referenceNumber,
      denialReason: null,
      claimDate: null,
      isDeleted: false,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/document-requests/add-document-request/${user.residentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataDocumentRequest),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Document Requested!", responseData);
      setIsSubmitted(true);
    } catch (error) {
      console.log("Error submitting document request:", error.message);
    }
  };

  return (
    <div className="bg-slate-100 w-full h-full">
      <header
        className="h-96 w-full bg-cover text-black"
        style={{ backgroundImage: 'url("images/document-request-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Document Request</h1>
          <span className=" flex justify-center font-small text-lg mt-2 mr-96">
            Effortlessly request essential barangay documents here. Choose your
            document type, provide necessary details, and enjoy a streamlined,
            secure process. Opt for document printing and make hassle-free
            payments. Your essential paperwork, simplified.
          </span>
        </div>
      </header>
      {isSubmitted ? (
        <Success />
      ) : (
        <div className="px-12 py-8 w-3/4">
          <form onSubmit={handleSubmit} className="pb-20">
            {/* FIRST ROW */}
            <FirstRow
              firstTitle="First Name"
              firstName={firstName}
              handleFirstName={handleFirstName}
              secondTitle="Last Name"
              lastName={lastName}
              handleLastName={handleLastName}
              thirdTitle="Middle I."
              middleInitial={middleInitial}
              handleMiddleInitial={handleMiddleInitial}
            />
            {/* SECOND ROW */}
            <SecondRow
              firstTitle="Contact Information"
              contactNumber={contactNumber}
              handlecontactNumber={handlecontactNumber}
              secondTitle="Email Address"
              email={email}
              handleEmail={handleEmail}
            />
            {/* THIRD ROW */}
            <ThirdRow
              firstTitle="Address"
              address={address}
              handleAddress={handleAddress}
            />
            {/* FOURTH ROW */}
            <FourthRow
              firstTitle="Document Type"
              documentType={documentType}
              handleDocumentType={handleDocumentType}
              documentTypes={documentTypes}
              secondTitle="Purpose"
              purpose={purpose}
              handlePurpose={handlePurpose}
            />
            {/* FIFTH ROW */}
            <FifthRow
              firstTitle="Valid ID"
              validIdType={validIdType}
              handleValidIdType={handleValidIdType}
              validIdTypes={validIdTypes}
              storeUploadedPhoto={storeUploadedPhoto}
            />

            <div className="flex flex-col gap-5 mt-16 w-full">
              <div>
                <p>Do you want to have your document printed?</p>
                <div className="mt-3">
                  <label
                    htmlFor="printDocument"
                    className="inline-flex items-center"
                  >
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
                <div className="mt-1">
                  <p>
                    If you choose to have it printed, how many copies would you
                    like?
                  </p>
                  <div className="flex flex-col w-5/12">
                    <label htmlFor="printCopiesId" className="mb-1" />
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
              )}

              {toPrint && (
                <div className="mt-3">
                  <p>Document Pricing:</p>
                  <table className="w-full border-collapse border border-slate-200 mt-3">
                    <colgroup>
                      <col style={{ width: "50%" }} />
                      <col style={{ width: "50%" }} />
                    </colgroup>
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-slate-200 p-2">
                          Document Type
                        </th>
                        <th className="border border-slate-200 p-2">Pricing</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="border border-slate-200 p-2">
                          Barangay Clearance
                        </td>
                        <td className="border border-slate-200 p-2">
                          Php 100.00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2">
                          Barangay ID
                        </td>
                        <td className="border border-slate-200 p-2">
                          Php 150.00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2">
                          Certificate of Indigency
                        </td>
                        <td className="border border-slate-200 p-2">
                          Php 50.00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2">
                          Barangay Permit
                        </td>
                        <td className="border border-slate-200 p-2">
                          Php 500.00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 p-2">Others</td>
                        <td className="border border-slate-200 p-2">
                          Php 150.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {toPrint && (
                <div>
                  <div className="mt-3">
                    To proceed with document printing, submit the payment
                    through GCash to the following number:
                  </div>

                  <div className="flex flex-row gap-2 items-center px-8 w-1/2">
                    <img
                      src="images/GCash-Logo.png" // Replace with the actual path to your image
                      alt="GCashLogo" // Provide a meaningful alt text for accessibility
                      className="mt-4 w-36" // Apply any necessary styling, like max-width
                    />
                    <div className="flex flex-col text-xl font-bold px-3">
                      <div>09568876634</div>
                      <div className=" italic">Juan dela Cruz Jr.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {toPrint && (
              <div className="mt-5">
                <div>
                  After making the payment, enter the reference number of the
                  transaction below.
                </div>
                <div className="w-5/12">
                  <label htmlFor="referenceNumberId"></label>
                  <input
                    type="number"
                    id="referenceNumberId"
                    name="lastName"
                    value={referenceNumber}
                    onChange={handleReferenceNumber}
                    required
                    className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="mt-8">
              <Submit />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
