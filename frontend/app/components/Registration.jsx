import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FirstRow from "../utils/FirstRow";
import FourthRow from "../utils/FourthRow";
import SecondRow from "../utils/SecondRow";
import ThirdRow from "../utils/ThirdRow";

export default function Registration({ SignUpTitle }) {
    const [isShowing, setIsShowing] = useState(false);

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
        console.log("Resident's Information:", formData);
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
                                    src="/images/logo.png"
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
                                        firstTitle="Contact Information"
                                        secondTitle="Birthdate"
                                        handleChange={handleChange}
                                    />
                                </div>
                                {/* <!-- Input field --> */}
                                <div className="relative flex">
                                    <ThirdRow
                                        firstTitle="Address"
                                        secondTitle="Email Address"
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
                            <input type="checkbox" name="checkbox" />
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
        </div>
    );
}
