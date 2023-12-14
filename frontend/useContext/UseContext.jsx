"use client";

import SuccessPopup from "@/app/utils/SuccessPopUp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [showUnverifiedPopup, setShowUnverifiedPopup] = useState(false);

    async function login(username, password, role) {
        try {
            const response = await axios.post(`http://localhost:8080/${role}/login`, {
                username,
                password,
            });
            console.log(response);
            if (response.status === 200) {
                const {
                    firstName,
                    lastName,
                    role,
                    adminId,
                    residentId,
                    isVerified,
                    ...userDetails
                } = response.data;

                // Create a user object based on the role
                let user;
                if (role === "admin") {
                    user = { firstName, lastName, role, adminId, ...userDetails };
                    setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    router.push("/admin-dashboard");
                } else if (role === "resident") {
                    user = {
                        firstName,
                        lastName,
                        role,
                        residentId,
                        isVerified,
                        ...userDetails,
                    };

                    if (isVerified) {
                        setUser(user);
                        localStorage.setItem("user", JSON.stringify(user));
                        router.push("/dashboard");
                    } else {
                        console.log("Resident is not verified");
                        setShowUnverifiedPopup(true);
                        // Handle the unverified resident case, perhaps show a message or redirect to a different page
                    }
                } else {
                    throw new Error(`Unknown role: ${role}`);
                }

                return user;
            } else {
                console.log(`Failed to login for role ${role}`);
                throw new Error(`Failed to login for role ${role}`);
            }
        } catch (error) {
            console.error("An error occurred during login:", error.message);
            throw error;
        }
    }

    function logout() {
        window.localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {showUnverifiedPopup && (
                <SuccessPopup
                    title="Account Not Verified"
                    message="Sorry! Your account has not been verified yet. Please wait for an admin to verify your account."
                    onConfirm={() => setShowUnverifiedPopup(false)}
                    btnMessage="Understood"
                />
            )}
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
