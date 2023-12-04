"use client";
import React, { useState } from "react";
import { useAuth } from "@/useContext/UseContext";

import FirstRow from "@/app/utils/docreq/FirstRow";
import SecondRow from "@/app/utils/docreq/SecondRow";
import ThirdRow from "@/app/utils/docreq/ThirdRow";
import FourthRow from "@/app/utils/docreq/FourthRow";
import FifthRow from "@/app/utils/docreq/FifthRow";
import PrintChoice from "@/app/utils/docreq/PrintChoice";
import ConfirmationPopup from "@/app/components/ConfirmationPopup";
import Submit from "@/app/utils/docreq/Submit";
import Success from "@/app/utils/docreq/Success";

export default function DocumentRequest() {
  const { user, login } = useAuth();
  const id = user.residentId;

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
    { value: "", label: "Select Document" },
    { value: "barangayclearance", label: "Barangay Clearance" },
    { value: "barangayid", label: "Barangay ID" },
    { value: "certificateOfIndigency", label: "Certificate of Indigency" },
    { value: "businessPermit", label: "Business Permit" },
    { value: "others", label: "Others (Please Specify)" },
  ];

  const [specifiedDocumentType, setSpecifiedDocumentType] = useState("");
  const handleSpecifiedDocumentType = (e) => {
    setSpecifiedDocumentType(e.target.value);
  };

  const [purpose, setPurpose] = useState("");
  const handlePurpose = (e) => {
    setPurpose(e.target.value);
  };

  const [validIdType, setValidIdType] = useState("");
  const handleValidIdType = (e) => {
    setValidIdType(e.target.value);
  };
  const validIdTypes = [
    { value: "", label: "Select Valid ID" },
    { value: "driverslicense", label: "Driver's License" },
    { value: "governmentissuedid", label: "Government Issued ID" },
    { value: "passport", label: "Passport" },
    { value: "schoolid", label: "School ID" },
    { value: "others", label: "Others (Please Specify)" },
  ];
  const [specifiedValidIdType, setSpecifiedValidIdType] = useState("");
  const handleSpecifiedValidIdType = (e) => {
    setSpecifiedValidIdType(e.target.value);
  };

  const [validId, setValidId] = useState(null);
  const [imageFormat, setImageFormat] = useState(null);

  const storeUploadedPhoto = (photo) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // Extract base64 data
      setValidId(base64String); // Set the base64 string in the state

      // Determine the image format (e.g., JPEG, PNG)
      let imgFormat = "";
      if (photo.type) {
        imgFormat = photo.type.split("/")[1];
      }
      setImageFormat(imgFormat); // Set the image format in the state
    };
    reader.readAsDataURL(photo);
  };

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
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmationPopup(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmationPopup(false); 

    let finalDocumentType = documentType;
    if (documentType === "others") {
      finalDocumentType = specifiedDocumentType;
    }

    let finalValidIdType = validIdType;
    if (validIdType === "others") {
      finalValidIdType = specifiedValidIdType;
    }

    if (validId != null) {
      const dataDocumentRequest = {
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        email: email,
        contactNumber: contactNumber,
        address: address,
        documentType: finalDocumentType,
        documentStatus: "Pending",
        requestDate: new Date(),
        purpose: purpose,
        validIdType: finalValidIdType,
        validId: validId,
        imageFormat: imageFormat,
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
        
        setIsSubmitted(true);
        const responseData = await response.json();
        
      } catch (error) {
        console.log("Error submitting document request:", error.message);
      }

      console.log(dataDocumentRequest);
    } else {
      alert("Please upload a valid ID.");
      return;
    }
  };
  const handleCancelSubmit = () => {
    setShowConfirmationPopup(false);
  };

  return (
    <div className="w-full h-full">
      <header
        className="h-96 w-full bg-cover text-black"
        style={{ backgroundImage: 'url("images/document-request-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Document Request</h1>
          <span className="flex justify-center font-small text-lg mt-2 mr-96">
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
        <form onSubmit={handleSubmit} >
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
          <FourthRow
            firstTitle="Document Type"
            documentType={documentType}
            handleDocumentType={handleDocumentType}
            documentTypes={documentTypes}
            secondTitle="Purpose"
            purpose={purpose}
            handlePurpose={handlePurpose}
            specifiedDocumentType={specifiedDocumentType}
            handleSpecifiedDocumentType={handleSpecifiedDocumentType}
          />
          {/* FIFTH ROW */}
          <FifthRow
            firstTitle="Valid ID"
            validIdType={validIdType}
            handleValidIdType={handleValidIdType}
            validIdTypes={validIdTypes}
            storeUploadedPhoto={storeUploadedPhoto}
            specifiedValidIdType={specifiedValidIdType}
            handleSpecifiedValidIdType={handleSpecifiedValidIdType}
          />
          {/* Choose to print or not to print */}
          <PrintChoice
            toPrint={toPrint}
            handlePrintOptionChange={handlePrintOptionChange}
            printCopies={printCopies}
            handlePrintCopiesChange={handlePrintCopiesChange}
            referenceNumber={referenceNumber}
            handleReferenceNumber={handleReferenceNumber}
          />

          <Submit />
        </form>
        {showConfirmationPopup && (
            <ConfirmationPopup
              message="Are you sure you want to submit this report?"
              onConfirm={handleConfirmSubmit}
              onCancel={handleCancelSubmit}
            />
          )}
      </div>
      )}
    </div>
  );
}
