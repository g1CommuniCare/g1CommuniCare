"use client";

import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/useContext/UseContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    // COMMENT OUT IF DI KA GANAHAN MAG LOGIN LOGIN
    // IF NA COMMENT OUT DILI MA DISPLAY ANG USER.USERNAME
    // useEffect(() => {
    //     if (!user || !user.role) {
    //         router.push("/");
    //     }
    // }, [user, router]);

    return (
        <>
            {user && (
                <div className="flex h-screen">
                    <Navbar />
                    {children}
                </div>
            )}
        </>
    );
}
