"use client";

import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import Details from "@/app/utils/appointments/Details";
import FirstRow from "@/app/utils/appointments/FirstRow";
import FourthRow from "@/app/utils/appointments/FourthRow";
import InputWithDate from "@/app/utils/appointments/InputWithDate";
import SecondRow from "@/app/utils/appointments/SecondRow";
import Submit from "@/app/utils/appointments/Submit";
import Success from "@/app/utils/appointments/Success";
import ThirdRow from "@/app/utils/appointments/ThirdRow";
import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useState } from "react";

const Appointment = () => {
    const { user } = useAuth();

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
    const [otherDepartment, setOtherDepartment] = useState("");
    const [department, setSelectDepartment] = useState("");
    const handleSelectDepartment = (e) => {
        const selectedDepartment = e.target.value;

        setIsOthersSelected(selectedDepartment === "Others");
        setSelectDepartment(isOthersSelected ? otherDepartment : selectedDepartment);
    };
    const departmentTypes = [
        { value: "", label: "-- Select a Department --" },
        { value: "Barangay Council", label: "Barangay Council" },
        { value: "Health Center", label: "Health Center" },
        { value: "Social Service", label: "Social Services" },
        { value: "Safety Office", label: "Safety Office" },
        { value: "Others", label: "Others" },
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
        { value: "", label: "-- Select a Meeting Format --" },
        { value: "In-Person", label: "In-Person" },
        { value: "Email", label: "Email Correspondence" },
        { value: "Video", label: "Video Conference" },
        { value: "Office Visit", label: "Office Visit" },
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

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationPopup(true);
    };

    const handleConfirmSubmit = async () => {
        setShowConfirmationPopup(false);

        // Prepare the data for submission
        const dataAppointments = {
            firstName: firstName,
            lastName: lastName,
            middleInitial: middleInitial,
            contactNumber: contactNumber,
            email: email,
            address: address,
            department: isOthersSelected ? otherDepartment : department,
            purpose: purpose,
            meetingFormat: meetingFormat,
            meetingDate: `${date}T${time}:00`,
            appointmentDetails: appointmentDetails,
            dateRequested: new Date().toISOString(),
            appointmentStatus: "Pending",
        };

        try {
            // const response = await fetch(
            //     `http://localhost:8080/appointment-requests/add-appointment-request/${user.residentId}`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(dataAppointments),
            //     }
            // );
            const response = await axios.post(
                `http://localhost:8080/appointment-requests/add-appointment-request/${user.residentId}`,
                dataAppointments,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.status === 200) {
                throw new Error("Failed to submit appointment request");
            }

            // Resetting form fields after successful submission
            // setFirstName("");
            // setLastName("");
            // setMiddleInitial("");
            // setContactNumber("");
            // setEmail("");
            // setAddress("");
            // setSelectDepartment("");
            // setOtherDepartment("");
            // setPurpose("");
            // setSelectMeetingFormat("");
            // setDate("");
            // setTime("");
            // setDetails("");

            // CREATE A POST NOTIFICATION FOR THE ADMIN TO BE NOTIFIED
            await axios.post(`http://localhost:8080/notifications/create`, {
                relatedAppointmentRequest: {
                    appreqId: response.data.appreqId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    middleInitial: response.data.middleInitial,
                    contactNumber: response.data.contactNumber,
                    email: response.data.email,
                    address: response.data.address,
                    department: response.data.department,
                    purpose: response.data.purpose,
                    imageFormat: response.data.imageFormat,
                    meetingFormat: response.data.meetingFormat,
                    meetingDate: response.data.meetingDate,
                    // LACKING DETAILS
                },
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting appointment request:", error.message);
        }
        console.log(dataAppointments)
    };

    const handleCancelSubmit = () => {
        setShowConfirmationPopup(false);
    };

    return (
        <div className="bg-slate-100 w-full h-full">
            <header
                className="h-96 w-full bg-cover text-black mb-8"
                style={{ backgroundImage: 'url("images/appointment-header.png")' }}
            >
                <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
                    <h1 className="font-bold text-6xl mb-2">Appointments</h1>
                    <span className=" flex justify-center font-small text-lg mt-2 mr-96">
                        Efficiently schedule and manage appointments here. Seamlessly connect with
                        barangay officials and departments for consultations or discussions. Take
                        control of your time and engagement with a straightforward and convenient
                        appointment system.
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

                        {/* Render text field for additional details if "Others" is selected */}
                        {isOthersSelected && (
                            <div className="flex gap-8 mt-12 mb-12">
                                <div className="h-[58px] w-5/12 ">
                                    <div className="flex flex-col flex-1">
                                        <label htmlFor="otherDetails">Specify Department</label>
                                        <input
                                            type="text"
                                            id="otherDetails"
                                            name="otherDetails"
                                            value={otherDepartment}
                                            required
                                            onChange={(e) => setOtherDepartment(e.target.value)}
                                            className="peer relative w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

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
                    {showConfirmationPopup && (
                        <ConfirmationPopup
                            message="Are you sure you want to submit this appointment request?"
                            onConfirm={handleConfirmSubmit}
                            onCancel={handleCancelSubmit}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointment;
