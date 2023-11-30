"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function login(username, password, role) {
        try {
            const response = await axios.post(`http://localhost:8080/${role}/login`, {
                username,
                password,
            });

            if (response.status === 200) {
                const { firstName, lastName, role } = response.data;

                setUser({ firstName, lastName, role });
                localStorage.setItem("user", JSON.stringify({ firstName, lastName, role }));

                console.log({ firstName, lastName, role });

                if (role === "admin") {
                    router.push("/admin-dashboard");
                } else if (role === "resident") {
                    router.push("/dashboard");
                }

                return { firstName, lastName, role };
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
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}