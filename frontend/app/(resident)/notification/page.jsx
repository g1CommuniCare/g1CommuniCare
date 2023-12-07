"use client";

import useNotifications from "@/app/api/UseNotification";
import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useState } from "react";

export default function Notification() {
    const { user } = useAuth();

    // GET THE NOTIFICATION FOR THE RESIDENT USING CUSTOM FETCH HOOK
    const { notifications, isLoading, error } = useNotifications(
        `http://localhost:8080/notifications/resident/${user.residentId}`
    );

    // IS READ PARA SA UI
    const [isRead, setIsRead] = useState(null);

    async function handleReadNotification(notificationId) {
        console.log(notificationId);

        const response = await axios.post(
            `http://localhost:8080/notifications/mark-as-read/${notificationId}`,
            { method: "POST" }
        );
        const data = await response.data;
        setIsRead(data);
        console.log(data);
    }

    const fullName = user.firstName + " " + user.lastName;
    // console.log(fullName);

    return (
        <div
            className="w-full p-8 bg-cover"
            style={{ backgroundImage: 'url("images/profileBackgroundImage.png")' }}
        >
            <h1 className="font-bold text-6xl p-5">Notification</h1>
            <div className="flex flex-col justify-start gap-8 h-screen rounded-[22px] p-7 bg-slate-50/80">
                <img
                    src="/images/Notification.png"
                    alt="Notification Image"
                    className="w-10 h-10"
                />
                {notifications?.map(({ notificationId, isRead, message }) => (
                    <div key={notificationId}>
                        <p
                            onClick={() => handleReadNotification(notificationId)}
                            className={`flex items-center gap-1 p-5 rounded-2xl bg-gray-200 ${
                                isRead === true ? "bg-gray-200" : "border-2 border-rose-500"
                            }`}
                        >
                            {message},{" "}
                            <i>
                                <b>{fullName}!</b>
                            </i>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
