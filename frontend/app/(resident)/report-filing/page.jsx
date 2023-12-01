"use client";

import Details from "@/app/utils/reports/Details";
import FirstRow from "@/app/utils/reports/FirstRow";
import InputWithDate from "@/app/utils/reports/InputWithDate";
import SecondRow from "@/app/utils/reports/SecondRow";
import Submit from "@/app/utils/reports/Submit";
import Success from "@/app/utils/reports/Success";
import ThirdRow from "@/app/utils/reports/ThirdRow";
import { useAuth } from "@/useContext/UseContext";
import { useState } from "react";

const Report = () => {
  const { user, login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const [lastName, setLastName] = useState("");
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const middleInitialInput = 3;
  const [middleInitial, setMiddleInitial] = useState("");
  const handleMiddleInitial = (e) => {
    const input = e.target.value;

    if (input.length > middleInitialInput) {
      alert("Input should be 3 characters or less.");
    } else {
      setMiddleInitial(input);
    }
  };

  const [contactNumber, setContactNumber] = useState("");
  const handleContactNumber = (e) => {
    setContactNumber(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [address, setAddress] = useState("");
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const [isOthersSelected, setIsOthersSelected] = useState(false);
  const [reportType, setSelectReport] = useState("");
  const handleSelectReport = (e) => {
    const selectedReportType = e.target.value;

    setIsOthersSelected(selectedReportType === "opt");
    setSelectReport(isOthersSelected ? otherReportDetails : selectedReportType);
  };
  const reportTypes = [
    { value: "", label: "" },
    { value: "noise", label: "Noise Complaint" },
    { value: "road", label: "Road Problems" },
    { value: "sanitatioon", label: "Sanitation Problems" },
    { value: "opt", label: "Others" },
  ];

  const [date, setDate] = useState("");
  const handleDate = (e) => {
    console.log("Selected Date:", e.target.value);
    setDate(e.target.value);
  };

  const [time, setTime] = useState("");
  const handleTime = (e) => {
    console.log("Selected Time:", e.target.value);
    setTime(e.target.value);
  };

  const [reportDetails, setDetails] = useState("");
  const handleDetails = (e) => {
    setDetails(e.target.value);
  };
  const [otherReportDetails, setOtherReportDetails] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset(); // in minutes
    const localDate = new Date(currentDate.getTime() - timezoneOffset * 60000);
    const formattedCurrentDate = localDate.toISOString();

    const data = {
      firstName: firstName,
      lastName: lastName,
      middleInitial: middleInitial,
      contactNumber: contactNumber,
      email: email,
      address: address,
      reportType: isOthersSelected ? otherReportDetails : reportType,
      reportDate: `${date}T${time}:00`,
      reportDetails: reportDetails,
      reportStatus: "Pending",
      dateReported: formattedCurrentDate,
      reportUpdate: "",
    };

    const isConfirmed = window.confirm(
      "Are you sure you want to submit this report?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080//reports-filing/addReport/${user.residentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit appointment request");
      }

      setFirstName("");
      setLastName("");
      setMiddleInitial("");
      setContactNumber("");
      setEmail("");
      setAddress("");
      setSelectReport("");
      setDate("");
      setTime("");
      setDetails("");

      setIsSubmitted(true);
      const responseData = await response.json();
      console.log("Appointment request submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting appointment request:", error.message);
    }
  };

  return (
    <div className="bg-slate-100 w-full h-full">
      <header
        className="h-96 w-full bg-cover text-black mb-8"
        style={{ backgroundImage: 'url("images/report-filing-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
          <h1 className="font-bold text-6xl">Report Filing</h1>
          <span className=" flex justify-center font-small text-lg mt-2 mr-96">
            Report incidents swiftly here. Easily document and submit community
            concerns, from road issues to noise complaints. Your input matters,
            and our platform ensures a seamless process for a safer and more
            responsive barangay community.
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
              handleContactNumber={handleContactNumber}
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

            {/* FIFTH ROW */}
            <InputWithDate
              firstTitle="Report Type"
              reportType={reportType}
              handleSelectReport={handleSelectReport}
              reportTypes={reportTypes}
              secondTitle="Date"
              date={date}
              handleDate={handleDate}
              thirdTitle="Time"
              time={time}
              handleTime={handleTime}
            />

            {/* Render text field for additional details if "Others" is selected */}
            {isOthersSelected && (
              <div className="flex gap-8 mt-6 mb-12">
                <div className="h-[58px] w-5/12 ">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="otherDetails">Specify Report Type</label>
                    <input
                      type="text"
                      id="otherDetails"
                      name="otherDetails"
                      value={otherReportDetails}
                      onChange={(e) => setOtherReportDetails(e.target.value)}
                      className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SIXTH ROW */}
            <Details
              firstTitle="Details"
              reportDetails={reportDetails}
              handleDetails={handleDetails}
            />
            <Submit />
          </form>
        </div>
      )}
    </div>
  );
};

export default Report;
