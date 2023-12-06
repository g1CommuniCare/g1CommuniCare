import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FirstRow from "../utils/FirstRow";
import FourthRow from "../utils/FourthRow";
import SecondRow from "../utils/SecondRow";
import ThirdRow from "../utils/ThirdRow";
import ConfirmationPopup from "../utils/ConfirmationPupUp";
import SuccessPopup from "../utils/SuccessPopUp";

export default function Registration({ SignUpTitle }) {
    const [isShowing, setIsShowing] = useState(false);
    const [isSuccessPopupShowing, setIsSuccessPopupShowing] = useState(false);

    const initialState = {
        firstName: "",
        lastName: "",
        middleInitial: "",
        contactInformation: "",
        birthDate: "",
        address: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmitRegister(e) {
        e.preventDefault();

        if (Object.values(formData).some((value) => value.trim() === "")) {
            alert("Please answer all fields!\n");
            return;
        }

        let errorMessages = "";

        // Username must be between 6 to 30 characters
        if (formData.username.length < 6 || formData.username.length > 30) {
            errorMessages += "Username must be between 6 to 30 characters.\n";
        }

        // Contact information must have exactly 10 characters of numbers
        const contactInfoRegex = /^\d{10}$/;
        if (!contactInfoRegex.test(formData.contactInformation)) {
            errorMessages += "Please provide a valid contact information.\n";
        }

        // Password doesn't meet the criteria
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            errorMessages +=
                "Password must include lowercase, uppercase letters, numbers, and symbols.\n";
        }

        // Password and confirm password don't match
        if (formData.password !== formData.confirmPassword) {
            errorMessages += "Password does not match.\n";
        }

        // Check if the checkbox is checked
        const termsCheckbox = document.querySelector('input[name="termsAndConditions"]');
        if (!termsCheckbox.checked) {
            errorMessages += "Please agree to the terms and conditions.\n";
        }

        // Display error messages if there are any
        if (errorMessages.length > 0) {
            alert(errorMessages);
            return;
        }

        console.log("Resident's Information:", formData);

        const registrationData = {
            contactNumber: formData.contactInformation,
            email: formData.emailAddress,
            firstName: formData.firstName,
            middleInitial: formData.middleInitial,
            lastName: formData.lastName,
            password: formData.password,
            username: formData.username,
            address: formData.address,
            date: formData.birthDate,
        };

        // Make a POST request to your API endpoint
        fetch("http://localhost:8080/resident/insertResident", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Handle the response from the server
            })
            .catch((error) => {
                console.error("Error:", error);
            });

            setIsSuccessPopupShowing(true);
    }

    function handleSuccessPopupConfirm() {
        setIsSuccessPopupShowing(false);
        setIsShowing(false); // Optionally close the registration modal as well
    }

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsShowing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        let modalWrapper = document.getElementById("modal"); // Use the actual ID of your modal wrapper

        if (modalWrapper) {
            if (isShowing) {
                modalWrapper.style.overflowY = "auto"; // Allow scrolling within the modal
            } else {
                modalWrapper.style.overflowY = "hidden"; // Disable scrolling within the modal
            }
        }
    }, [isShowing]);

    return (
        <div className="relative">
            <p className="text-[#001D6C] font-medium">
                No account yet?&nbsp;
                <button onClick={() => setIsShowing(true)} className="underline underline-offset-1">
                    <span>{SignUpTitle}</span>
                </button>
            </p>

            {isShowing && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-[875px] -translate-y-[675px] z-20 bg-slate-50/90 backdrop-blur-sm">
                    {/* <!-- Modal --> */}
                    <div
                        ref={wrapperRef}
                        className="flex flex-col min-w-[1195px] h-5/6 gap-4 rounded bg-transparent py-16 px-32 text-slate-500 shadow-md shadow-slate-700 overflow-hidden"
                        id="modal"
                        role="document"
                    >
                        {/* <!-- Modal header --> */}
                        <header id="header-4a" className="flex items-center">
                            <h3 className="flex-1 text-5xl mb-6 font-bold text-slate-700">
                                Registration
                            </h3>
                            <div>
                                <img
                                    src="/images/communicare-logo-tagline.png"
                                    alt="CommuniCare Logo"
                                    className="w-[279px] h-[95px]"
                                />
                            </div>
                        </header>
                        {/* <!-- Modal body --> */}
                        <div id="content-4a" className="flex-1">
                            <div className="flex flex-col gap-2">
                                {/* <!-- Input field --> */}
                                <div className="relative flex">
                                    <FirstRow
                                        firstTitle="First Name"
                                        secondTitle="Last Name"
                                        thirdTitle="Middle I."
                                        handleChange={handleChange}
                                    />
                                </div>
                                {/* <!-- Input field --> */}
                                <div className="relative flex">
                                    <SecondRow
                                        firstTitle="Username"
                                        secondTitle="Contact Information"
                                        thirdTitle="Birthdate"
                                        handleChange={handleChange}
                                    />
                                </div>
                                {/* <!-- Input field --> */}
                                <div className="relative flex">
                                    <ThirdRow
                                        firstTitle="Email Address"
                                        secondTitle="Address"
                                        handleChange={handleChange}
                                    />
                                </div>
                                {/* <!-- Input field --> */}
                                <div className="relative flex">
                                    <FourthRow
                                        firstTitle="Password"
                                        secondTitle="Confirm Password"
                                        handleChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 my-10">
                            <input type="checkbox" name="termsAndConditions" />
                            <p className="text-sm">
                                By clicking register, you agree to our{" "}
                                <Link href="/terms">
                                    <b>
                                        <u>Terms</u>
                                    </b>{" "}
                                </Link>
                                and{" "}
                                <Link href="/privacy-policy">
                                    <b>
                                        <u>Privacy Policy</u>
                                    </b>{" "}
                                </Link>
                                and consent to your information being to sent CommuniCare Admins.
                            </p>
                        </div>
                        <span className="h-[.8px] w-full bg-[#DDE1E6]"></span>
                        {/* <!-- Modal actions --> */}
                        <div className="flex items-center justify-between gap-2">
                            <button
                                onClick={handleSubmitRegister}
                                className="inline-flex w-[126px] h-12 items-center justify-center gap-2 whitespace-nowrap bg-blue-500 px-5 text-medium font-medium tracking-wide text-white transition duration-300 hover:bg-[#2E64B0] focus:bg-[#2E64B0] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#2E64B0] disabled:bg-[#2E64B0] disabled:shadow-none"
                            >
                                <span>Register</span>
                            </button>
                            <p className="text-[#2E64B0]">
                                Already have an account?&nbsp;
                                <button onClick={() => setIsShowing(false)}>
                                    <b>
                                        <u>Log In!</u>
                                    </b>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {isSuccessPopupShowing && (
                <SuccessPopup
                title="Registered Successfully!"
                    message="Congratulations! Registration successful. Please wait until your account is verified."
                    onConfirm={handleSuccessPopupConfirm}
                    onCancel={() => setIsSuccessPopupShowing(false)}
                    btnMessage= "Back to Log in Page"
                />
            )}
        </div>
    );
}
