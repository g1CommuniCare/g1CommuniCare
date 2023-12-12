"use client";
import ConfirmationPopup from "@/app/utils/ConfirmationPupUp";
import Details from "@/app/utils/reports/Details";
import FirstRow from "@/app/utils/reports/FirstRow";
import InputWithDate from "@/app/utils/reports/InputWithDate";
import SecondRow from "@/app/utils/reports/SecondRow";
import Submit from "@/app/utils/reports/Submit";
import Success from "@/app/utils/reports/Success";
import ThirdRow from "@/app/utils/reports/ThirdRow";
import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
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
    const [otherReportDetails, setOtherReportDetails] = useState("");
    const handleSelectReport = (e) => {
        const selectedReportType = e.target.value;
        setIsOthersSelected(selectedReportType === "Others");
        setSelectReport(selectedReportType);
    };
    const reportTypes = [
        { value: "", label: "-- Select a Report Type --" },
        { value: "Noise", label: "Noise Complaint" },
        { value: "Road", label: "Road Problems" },
        { value: "Sanitation", label: "Sanitation Problems" },
        { value: "Others", label: "Others" },
    ];

    const [date, setDate] = useState("");
    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const [time, setTime] = useState("");
    const handleTime = (e) => {
        setTime(e.target.value);
    };

    const [reportDetails, setDetails] = useState("");
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
        setShowConfirmationPopup(false); // Close the confirmation popup

        // Prepare the data for submission
        const dataReportFiling = {
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
            dateReported: new Date().toISOString(), // Use the current date-time
            reportUpdate: "",
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/reports-filing/addReport/${user.residentId}`,
                dataReportFiling,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.status === 200) {
                throw new Error("Failed to submit report");
            }

            // Reset form fields after submission
            // setFirstName("");
            // setLastName("");
            // setMiddleInitial("");
            // setContactNumber("");
            // setEmail("");
            // setAddress("");
            // setSelectReport("");
            // setDate("");
            // setTime("");
            // setDetails("");
            // setOtherReportDetails("");

            // CREATE A POST NOTIFICATION FOR THE ADMIN TO BE NOTIFIED
            await axios.post(`http://localhost:8080/notifications/create`, {
                relatedReportsFiling: {
                    repfilId: response.data.repfilId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    middleInitial: response.data.middleInitial,
                    contactNumber: response.data.contactNumber,
                    email: response.data.email,
                    address: response.data.address,
                    reportType: response.data.reportType,
                    meetingDate: response.data.meetingDate,
                    reportDetails: response.data.reportDetails,
                },
            });
            // Handle the response (e.g., show success message, clear form)
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting report:", error.message);
        }
        console.log(dataReportFiling);
    };

    const handleCancelSubmit = () => {
        setShowConfirmationPopup(false);
    };

    return (
        <div className=" w-full h-full  bg-slate-100">
            <header
                className="h-96 w-full bg-cover text-black mb-8"
                style={{ backgroundImage: 'url("images/report-filing-header.png")' }}
            >
                <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
                    <h1 className="font-bold text-6xl">Report Filing</h1>
                    <span className=" flex justify-center font-small text-lg mt-2 mr-96">
                        Report incidents swiftly here. Easily document and submit community
                        concerns, from road issues to noise complaints. Your input matters, and our
                        platform ensures a seamless process for a safer and more responsive barangay
                        community.
                    </span>
                </div>
            </header>
            {isSubmitted ? (
                <Success />
            ) : (
                <div className="px-12 py-8 w-3/4">
                    <form onSubmit={handleSubmit}>
                        <FirstRow
                            firstTitle="First Name"
                            firstName={firstName}
                            handleFirstName={(e) => setFirstName(e.target.value)}
                            secondTitle="Last Name"
                            lastName={lastName}
                            handleLastName={(e) => setLastName(e.target.value)}
                            thirdTitle="Middle I."
                            middleInitial={middleInitial}
                            handleMiddleInitial={(e) => {
                                const input = e.target.value;
                                if (input.length <= 3) setMiddleInitial(input);
                            }}
                        />
                        <SecondRow
                            firstTitle="Contact Information"
                            contactNumber={contactNumber}
                            handleContactNumber={(e) => setContactNumber(e.target.value)}
                            secondTitle="Email Address"
                            email={email}
                            handleEmail={(e) => setEmail(e.target.value)}
                        />
                        <ThirdRow
                            firstTitle="Address"
                            address={address}
                            handleAddress={(e) => setAddress(e.target.value)}
                        />
                        <InputWithDate
                            firstTitle="Report Type"
                            reportType={reportType}
                            handleSelectReport={(e) => setSelectReport(e.target.value)}
                            reportTypes={reportTypes}
                            secondTitle="Date"
                            date={date}
                            handleDate={(e) => setDate(e.target.value)}
                            thirdTitle="Time"
                            time={time}
                            handleTime={(e) => setTime(e.target.value)}
                        />
                        {reportType === "Others" && (
                            <div className="mt-6 mb-12">
                                <label htmlFor="otherDetails">Specify Report Type</label>
                                <input
                                    type="text"
                                    id="otherDetails"
                                    value={otherReportDetails}
                                    onChange={(e) => setOtherReportDetails(e.target.value)}
                                    className="w-full h-[58px] py-1 mt-2 shadow-lg rounded-lg border border-slate-200 px-4 text-sm text-slate-500"
                                />
                            </div>
                        )}
                        <Details
                            firstTitle="Details"
                            reportDetails={reportDetails}
                            handleDetails={(e) => setDetails(e.target.value)}
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
};

export default Report;
