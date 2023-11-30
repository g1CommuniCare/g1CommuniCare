"use client";
import Details from "@/app/utils/appointments/Details";
import FirstRow from "@/app/utils/appointments/FirstRow";
import FourthRow from "@/app/utils/appointments/FourthRow";
import InputWithDate from "@/app/utils/appointments/InputWithDate";
import SecondRow from "@/app/utils/appointments/SecondRow";
import Submit from "@/app/utils/appointments/Submit";
import ThirdRow from "@/app/utils/appointments/ThirdRow";
import { useAuth } from "@/useContext/UseContext";

import { useState } from "react";

const Appointment = () => {
  const { user, login } = useAuth();
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

  const [department, setSelectDepartment] = useState("");
  const handleSelectDepartment = (e) => {
    setSelectDepartment(e.target.value);
  };
  const departmentTypes = [
    { value: "council", label: "Barangay Council" },
    { value: "health", label: "Health Center" },
    { value: "ss", label: "Social Services" },
    { value: "safety", label: "Safety Office" },
    { value: "opt", label: "Others" },
  ];

  const [purpose, setPurpose] = useState("");
  const handlePurpose = (e) => {
    setPurpose(e.target.value);
  };

  const [meetingFormat, setSelectMeetingFormat] = useState("");
  const handleSelectMeetingFormat = (e) => {
    setSelectMeetingFormat(e.target.value);
  };
  const meetingTypes = [
    { value: "person", label: "In-Person" },
    { value: "email", label: "Email Correspondence" },
    { value: "video", label: "Video Conference" },
    { value: "office", label: "Office Visit" },
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

  const [appointmentDetails, setDetails] = useState("");
  const handleDetails = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      middleInitial: middleInitial,
      contactNumber: contactNumber,
      email: email,
      address: address,
      department: department,
      purpose: purpose,
      meetingFormat: meetingFormat,
      meetingDate: `${date}T${time}:00`,
      appointmentDetails: appointmentDetails,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/appointment-requests/add-appointment-request/${user.residentId}`,
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

      const responseData = await response.json();
      console.log("Appointment request submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting appointment request:", error.message);
    }
  };

  return (
    <div className="bg-slate-100 w-full ">
      <header
        className="h-96 w-full bg-cover text-black mb-8"
        style={{ backgroundImage: 'url("images/appointment-header.png")' }}
      >
        <div className="flex justify-center flex-col my-auto ml-20 mr-96 h-full">
          <h1 className="font-bold text-6xl mb-8">Appointments</h1>
          <span className=" flex justify-center font-small text-lg mt-2 mr-96">
            Efficiently schedule and manage appointments here. Seamlessly
            connect with barangay officials and departments for consultations or
            discussions. Take control of your time and engagement with a
            straightforward and convenient appointment system.
          </span>
        </div>
      </header>
      <div className="bg-slate-100 w-full pl-20 pr-80">
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

          {/* FOURTH ROW */}
          <FourthRow
            firstTitle="Department"
            department={department}
            handleSelectDepartment={handleSelectDepartment}
            departmentTypes={departmentTypes}
            secondTitle="Purpose"
            purpose={purpose}
            handlePurpose={handlePurpose}
          />

          {/* FIFTH ROW */}
          <InputWithDate
            firstTitle="Meeting Format"
            meetingFormat={meetingFormat}
            handleSelectMeetingFormat={handleSelectMeetingFormat}
            meetingTypes={meetingTypes}
            secondTitle="Date"
            date={date}
            handleDate={handleDate}
            thirdTitle="Time"
            time={time}
            handleTime={handleTime}
          />

          {/* SIXTH ROW */}
          <Details
            firstTitle="Details"
            appointmentDetails={appointmentDetails}
            handleDetails={handleDetails}
          />
          <Submit />
        </form>
      </div>
    </div>
  );
};

export default Appointment;
