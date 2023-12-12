"use client";

import SuccessPopup from "@/app/utils/SuccessPopUp";
import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SecuritySettings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [isPasswordSameAsCurrent, setIsPasswordSameAsCurrent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { user } = useAuth();

    function validateCurrentPassword(value) {
        const isValid = value === user.password;
        setIsCurrentPasswordValid(isValid);
    }

    function validatePassword(value) {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        setIsPasswordValid(isValid);
    }

    function validateConfirmPassword(value, passwordValue) {
        const isValid = value === passwordValue;
        setIsConfirmPasswordValid(isValid);
    }

    function handleCurrentPasswordChange(e) {
        setCurrentPassword(e.target.value);
        validateCurrentPassword(e.target.value);
    }

    function handleChangePassword(e) {
        setChangePassword(e.target.value);
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
    }

    function checkIfPasswordIsTheSameAsCurrentPassword() {
        setIsPasswordSameAsCurrent(confirmPassword === user.password);
    }

    useEffect(() => {
        validateCurrentPassword(currentPassword);
        validatePassword(changePassword);
        validateConfirmPassword(confirmPassword, changePassword);
        checkIfPasswordIsTheSameAsCurrentPassword();
    }, [currentPassword, changePassword, confirmPassword]);

    async function handleSubmitUpdatedPassword() {
        if (!isPasswordSameAsCurrent && isPasswordValid && isConfirmPasswordValid) {
            await axios.put(
                `http://localhost:8080/resident/${user.residentId}/updatePassword?password=${changePassword}`
            );
            setShowSuccess(true);
        }
    }

    return (
        <div className="bg-slate-50/80 py-12 px-12 mx-auto rounded-b-3xl shadow-[0px_3px_5px_0px_#1a202c]">
            <div className="pt-10">
                <div className="flex items-center gap-5 my-10">
                    <p className="w-[200px] font-medium">Current Password</p>
                    {user && (
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            className={`w-[343px] px-5 py-3 rounded-md border-2 shadow-md ${
                                isCurrentPasswordValid
                                    ? "border-slate-200 focus:border-emerald-500"
                                    : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
                            }`}
                        />
                    )}
                    {!isCurrentPasswordValid && (
                        <small className="text-pink-500 mt-2">Incorrect current password.</small>
                    )}
                </div>
                <div className="flex items-center gap-5 my-10">
                    <p className="w-[200px] font-medium">New Password</p>
                    {user && (
                        <input
                            type="password"
                            value={changePassword}
                            onChange={handleChangePassword}
                            className={`w-[343px] px-5 py-3 rounded-md border-2 shadow-md ${
                                isPasswordValid
                                    ? "border-slate-200 focus:border-emerald-500"
                                    : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
                            }`}
                        />
                    )}
                    {!isPasswordValid && (
                        <small className="w-[330px] text-pink-500">
                            It must be a combination of minimum 8 uppercase and lowercase letters,
                            numbers, and symbols.
                        </small>
                    )}
                    {isPasswordSameAsCurrent && (
                        <small className="w-[330px] text-pink-500">
                            Your new password must not be the same as your current password
                        </small>
                    )}
                </div>
                <div className="flex items-center gap-5">
                    <p className="w-[200px] font-medium">Confirm Password</p>
                    {user && (
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={`w-[343px] px-5 py-3 rounded-md border-2 shadow-md ${
                                isConfirmPasswordValid
                                    ? "border-slate-200 focus:border-emerald-500"
                                    : "border-pink-500 invalid:border-pink-500 focus:border-pink-500"
                            }`}
                        />
                    )}
                    {!isConfirmPasswordValid && (
                        <small className="text-pink-500 mt-2">Passwords do not match.</small>
                    )}
                </div>
            </div>
            <button
                onClick={handleSubmitUpdatedPassword}
                className="mt-20 bg-[#3F948B] text-white py-4 px-16 rounded-lg text-sm"
            >
                Save Password
            </button>
            {showSuccess && (
                <SuccessPopup
                    title="Successfully Updated!"
                    message="Your password has been successfully updated."
                    onConfirm={() => setShowSuccess(false)}
                    btnMessage="Close"
                />
            )}
        </div>
    );
}
