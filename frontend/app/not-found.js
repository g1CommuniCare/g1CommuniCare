"use client";

import { useAuth } from "@/useContext/UseContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                router.push("/admin-dashboard");
            } else if (user.role === "resident") {
                router.push("/dashboard");
            }
        }
    }, []);

    return (
        <div className="flex items-center justify-center flex-col gap-5 w-full h-screen">
            <p className="font-bold text-4xl text-black">Page Not Found</p>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                Go back to the
                <Link href="/" className="text-blue-500 hover:text-blue-800">
                    {" "}
                    Homepage
                </Link>
                .
            </p>
        </div>
    );
}
