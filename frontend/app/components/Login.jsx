"use client";

import { useAuth } from "@/useContext/UseContext";
import { useState } from "react";
import LoginInput from "../utils/LoginInput";
import Registration from "./Registration";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loginAdmin, loginResident } = useAuth();

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    async function submitLogin(e) {
        e.preventDefault();

        await loginAdmin(username, password);
        await loginResident(username, password);
    }

    return (
        <div className="relative flex max-w-[1536px] my-[50px] mx-auto">
            <div className="ml-[4%] w-[794px]">
                <img src="/images/login.png" alt="CommuniCare Login Image" />
            </div>
            <form className="absolute top-0 right-0 bottom-0 mr-[120px] min-w-[704px] h-[755px] my-auto shadow-md shadow-black">
                <div className="flex flex-col px-20 py-28">
                    <div className="flex justify-center">
                        <img src="/images/logo.png" alt="CommuniCare Logo" className="w-[334px]" />
                    </div>

                    <LoginInput
                        username={username}
                        handleUsername={handleUsername}
                        password={password}
                        showPassword={showPassword}
                        handlePassword={handlePassword}
                        handleShowPassword={handleShowPassword}
                    />

                    <div className="flex justify-between mt-8 mb-4">
                        <div>
                            <input type="checkbox" name="checkbox" />
                            Remember me
                        </div>
                        <button className="text-[#001D6C] font-medium">Forgot Password?</button>
                    </div>

                    <button
                        onClick={submitLogin}
                        className="w-full bg-[#2E64B0] py-4 text-white font-medium"
                    >
                        Log In
                    </button>

                    <span className="h-[.8px] w-full bg-[#DDE1E6] my-8"></span>

                    <Registration SignUpTitle="Sign up" />
                </div>
            </form>
        </div>
    );
}
