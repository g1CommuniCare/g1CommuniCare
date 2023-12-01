"use client";

import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/useContext/UseContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({ children }) {
    const { user, logout } = useAuth();
    const router = useRouter();

    // COMMENT OUT IF DI KA GANAHAN MAG LOGIN LOGIN
    // IF NA COMMENT OUT DILO
    useEffect(() => {
        if (user && user.role === "resident") {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    }, [user, router]);

    return (
        <>
            {user && (
                <div className="flex">
                    {/* <p>Hi, {user.firstName}</p>
                    <button onClick={handleLogout}>logout</button> */}
                    <Navbar />
                    {children}
                </div>
            )}
        </>
    );
}
