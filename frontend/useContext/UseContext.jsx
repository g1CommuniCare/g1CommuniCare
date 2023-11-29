"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function getAllUsers(endpoint) {
        const response = await fetch(`http://localhost:8080/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);

            const userDetails = data.map(user => ({
                username: user.username,
                role: user.role
            }))

            // console.log(userDetails);
        } else {
            console.log(`Failed to fetch data for ${endpoint}`);
        }
    }

    useEffect(() => {
        getAllUsers("admin/getAllAdmins");
        getAllUsers("resident/getAllResident");
    }, []);

    async function loginAdmin(username, password) {
        await login("admin", username, password);
    }

    async function loginResident(username, password) {
        await login("resident", username, password);
    }

    async function login(role, username, password) {
        try {
            const response = await fetch(`http://localhost:8080/${role}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                console.log(data);

                if (data.role === "admin") {
                    router.push("/admin-dashboard");
                } else if (data.role === "resident") {
                    router.push("/dashboard");
                }
            } else {
                const errorData = await response.json();
                console.error("Login failed. Server response:", errorData);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginAdmin, loginResident, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
