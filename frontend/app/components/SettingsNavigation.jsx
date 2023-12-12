"use client";

import { useAuth } from "@/useContext/UseContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNavigation() {
    const { user } = useAuth();
    const pathname = usePathname();

    const isSettingsAdmin = user.role === "admin" && pathname === "/admin-settings";
    const isSettings = user.role === "resident" && pathname === "/settings";
    const isSecurityAdmin = user.role === "admin" && pathname === "/admin-settings/admin-security-settings";
    const isSecurity = user.role === "resident" && pathname === "/settings/security-settings";

    return (
        <nav className="text-lg mb-3">
            {user.role === "admin" && (
                <Link
                    href="/admin-settings"
                    className={`bg-slate-50/80 py-4 px-10 text-lg font-medium rounded-tl-xl ${
                        isSettingsAdmin
                            ? "text-black rounded-tr-2xl shadow-[inset_1px_1px_0px_0px_#1a202c]"
                            : "text-slate-400"
                    }`}
                >
                    Account Settings
                </Link>
            )}
            {user.role === "resident" && (
                <Link
                    href="/settings"
                    className={`bg-slate-50/80 py-4 px-10 text-lg font-medium rounded-tl-xl ${
                        isSettings
                            ? "text-black rounded-tr-2xl shadow-[inset_1px_1px_0px_0px_#1a202c]"
                            : "text-slate-400"
                    }`}
                >
                    Account Settings
                </Link>
            )}
            {user.role === "admin" && (
                <Link
                    href="/admin-settings/admin-security-settings"
                    className={`bg-slate-50/80 py-4 px-10 text-lg font-medium rounded-tr-xl ${
                        isSecurityAdmin
                            ? "text-black rounded-tl-2xl shadow-[inset_1px_1px_0px_0px_#1a202c]"
                            : "text-slate-400"
                    }`}
                >
                    Security Settings
                </Link>
            )}
            {user.role === "resident" && (
                <Link
                    href="/settings/security-settings"
                    className={`bg-slate-50/80 py-4 px-10 text-lg font-medium rounded-tr-xl ${
                        isSecurity
                            ? "text-black rounded-tl-2xl shadow-[inset_1px_1px_0px_0px_#1a202c]"
                            : "text-slate-400"
                    }`}
                >
                    Security Settings
                </Link>
            )}
        </nav>
    );
}
