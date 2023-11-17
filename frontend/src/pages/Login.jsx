import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../utils/input";

const robotoUser = {
    username: "user",
    password: "password",
};

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    function submitLogin(e) {
        e.preventDefault();
        if (username === robotoUser.username && password === robotoUser.password) {
            handleLogin(true);
            navigate("/");
        } else {
            alert("Wrong credentials");
        }
    }

    return (
        <div className="flex max-w-[1536px] my-[50px] mx-auto">
            <div className="relative ">
                <div className="ml-[8%] w-[794px]">
                    <img src="/images/login.png" alt="CommuniCare Login Image" />
                </div>
                <form
                    onSubmit={submitLogin}
                    className="absolute top-0 right-0 mr-[-625px] min-w-[704px] h-[755px] my-[50px] shadow-md shadow-black"
                >
                    <div className="flex flex-col px-20 py-28">
                        <div className="flex justify-center">
                            <img
                                src="/images/logo.png"
                                alt="CommuniCare Logo"
                                className="w-[334px]"
                            />
                        </div>

                        <Input
                            username={username}
                            handleUsername={handleUsername}
                            password={password}
                            showPassword={showPassword}
                            handlePassword={handlePassword}
                            handleShowPassword={handleShowPassword}
                        />

                        <div className="flex justify-between mt-8 mb-4">
                            <div>
                                <input type="checkbox" />
                                Remember me
                            </div>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2E64B0] py-4 text-white font-medium"
                        >
                            Log In
                        </button>

                        <span className="h-[.8px] w-full bg-[#DDE1E6] my-8"></span>

                        <p>
                            No account yet?&nbsp;<Link to="/Sign up">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
