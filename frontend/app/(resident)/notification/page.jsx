"use client";

import useNotifications from "@/app/api/UseNotification";
import { useAuth } from "@/useContext/UseContext";
import { useEffect } from "react";

export default function Notification() {
    const { user } = useAuth();

    // async function fetchNotifications() {
    //     const res = await axios.get(
    //         `http://localhost:8080/notifications/resident/${user.residentId}`
    //     );
    //     const data = res.data;
    //     setNotifications(data);
    // }

    // console.log(notifications);

    // const isRead = notifications?.map((isRead) => isRead.isRead);
    // console.log(isRead);
    // const notificationId = notifications.map((notificationId) => notificationId.notificationId);
    // console.log(notificationId);

    // async function handleReadNotification() {
    //     const res = await axios.post(
    //         `http://localhost:8080/notifications/mark-as-read/${notificationId}`
    //     );
    //     const data = res.data;
    //     console.log(data);
    // }

    // GET THE NOTIFICATION FOR THE RESIDENT USING CUSTOM FETCH HOOK
    const { notifications, isLoading, error } = useNotifications(
        `http://localhost:8080/notifications/resident/${user.residentId}`
    );

    console.log(notifications);

    const notificationId = notifications?.map((notificationId) => notificationId.notificationId);

    console.log(notificationId);

    // const [notifications, setNotifications] = useState([]);

    async function handlReadNotification() {
        // const res = await axios.post(
        //     `http://localhost:8080/notifications/mark-as-read/${notifications.notificationId}`
        // );
        // const data = res.data;
        // setIsRead(data);
        // console.log(data);

        const response = await fetch(
            `http://localhost:8080/notifications/mark-as-read/${notificationId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isRead: true }),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Failed to mark notification as read:", errorMessage);
        } else {
            const data = await response.text();
            console.log("Notification marked as read successfully:", data);
        }

        console.log(notifications);
    }

    // useEffect(() => {
    //     handlReadNotification();
    //     fetchNotifications();
    // }, []);

    // const data = notifications?.map((notif) => notif.message);
    // console.log(data);

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
                {notifications?.map(({ notificationId, message }) => (
                    <div key={notificationId}>
                        <p onClick={handlReadNotification} className="bg-gray-200 p-7 rounded-lg">
                            {message}, <i>{fullName}!</i>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
