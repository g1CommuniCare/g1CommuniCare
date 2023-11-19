import React, { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"
import ReactDOM from "react-dom";
import FirstRow from "../utils/FirstRow";
import FourthRow from "../utils/FourthRow";
import SecondRow from "../utils/SecondRow";
import ThirdRow from "../utils/ThirdRow";

export default function Registration({ SignUpTitle }) {
    const [isShowing, setIsShowing] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleInitial, setMiddleIntial] = useState("");
    const [contactInformation, setContactInformation] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleMiddleInitial(e) {
        setMiddleIntial(e.target.value);
    }

    function handleContactInformation(e) {
        setContactInformation(e.target.value);
    }

    function handleBirthDate(e) {
        setBirthDate(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    function handleEmailAddress(e) {
        setEmailAddress(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    function handleSubmitRegister(e) {
        e.preventDefault();
        const formData = {
            firstName, lastName, middleInitial, contactInformation, birthDate, address, emailAddress, password, confirmPassword
        }
        console.log("Resident's Information:", formData)
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

            {isShowing && typeof document !== "undefined"
                ? ReactDOM.createPortal(
                      <div
                          className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-slate-50/90"
                          aria-labelledby="header-4a content-4a"
                          aria-modal="true"
                          tabIndex="-1"
                          role="dialog"
                      >
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
                                              firstName={firstName}
                                              handleFirstName={handleFirstName}
                                              secondTitle="Last Name"
                                              lastName={lastName}
                                              handleLastName={handleLastName}
                                              thirdTitle="Middle I."
                                              middleInitial={middleInitial}
                                              handleMiddleInitial={handleMiddleInitial}
                                          />
                                      </div>
                                      {/* <!-- Input field --> */}
                                      <div className="relative flex">
                                          <SecondRow
                                              firstTitle="Contact Information"
                                              contactInformation={contactInformation}
                                              handleContactInformation={handleContactInformation}
                                              secondTitle="Birthdate"
                                              birthDate={birthDate}
                                              handleBirthDate={handleBirthDate}
                                          />
                                      </div>
                                      {/* <!-- Input field --> */}
                                      <div className="relative flex">
                                          <ThirdRow
                                              firstTitle="Address"
                                              address={address}
                                              handleAddress={handleAddress}
                                              secondTitle="Email Address"
                                              emailAddress={emailAddress}
                                              handleEmailAddress={handleEmailAddress}
                                          />
                                      </div>
                                      {/* <!-- Input field --> */}
                                      <div className="relative flex">
                                          <FourthRow
                                              firstTitle="Password"
                                              password={password}
                                              handlePassword={handlePassword}
                                              secondTitle="Confirm Password"
                                              confirmPassword={confirmPassword}
                                              handleConfirmPassword={handleConfirmPassword}
                                          />
                                      </div>
                                  </div>
                              </div>
                              <div className="flex gap-2 my-10">
                                  <input type="checkbox" />
                                  <p className="text-sm">
                                      By clicking register, you agree to our{" "}
                                      <Link to="/terms">
                                          <b>
                                              <u>Terms</u>
                                          </b>{" "}
                                      </Link>
                                      and{" "}
                                      <Link to="/privacy-policy">
                                          <b>
                                              <u>Privacy Policy</u>
                                          </b>{" "}
                                      </Link>
                                      and consent to your information being to sent CommuniCare
                                      Admins.
                                  </p>
                              </div>
                              <span className="h-[.8px] w-full bg-[#DDE1E6]"></span>
                              {/* <!-- Modal actions --> */}
                              <div className="flex items-center justify-between gap-2">
                                  <button onClick={handleSubmitRegister} className="inline-flex w-[126px] h-12 items-center justify-center gap-2 whitespace-nowrap bg-blue-500 px-5 text-medium font-medium tracking-wide text-white transition duration-300 hover:bg-[#2E64B0] focus:bg-[#2E64B0] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#2E64B0] disabled:bg-[#2E64B0] disabled:shadow-none">
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
                      </div>,
                      document.body
                  )
                : null}
        </div>
    );
}
