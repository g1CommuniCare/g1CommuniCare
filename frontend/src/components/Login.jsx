import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    function handleUsername(e) {
        const type = e.target.value;
        setUsername(type);
    }

    const [password, setPassword] = useState("");
    function handlePassword(e) {
        const type = e.target.value;
        setPassword(type);
    }

    const navigate = useNavigate();

    async function login() {
        try {
            const res = await fetch("http://localhost:8080/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.text();
            console.log(data); // Log or handle the response as needed

            if (res.ok) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        login();
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={handleUsername} />
                <input type="password" value={password} onChange={handlePassword} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
