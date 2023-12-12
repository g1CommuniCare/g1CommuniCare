"use client";

import { useAuth } from "@/useContext/UseContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Notification() {
    const [welcomeMessage, setWelcomeMessage] = useState(null);
    const [documentRequests, setDocumentRequests] = useState(null);
    const { user } = useAuth();

    async function getAllNotifications() {
        const [welcome, allNotifications] = await Promise.all([
            axios.get(`http://localhost:8080/notifications/resident/${user.residentId}`),
            axios.get("http://localhost:8080/notifications/getAllNotifications"),
        ]);
        const welcomeData = welcome.data;
        setWelcomeMessage(welcomeData);

        const notifications = allNotifications.data;
        const filter = notifications?.map(({ relatedDocumentRequest }) => ({
            relatedDocumentRequest: relatedDocumentRequest === "Approved",
        }));
        const sortedPosts = notifications
            ?.filter(({ relatedDocumentRequest }) => relatedDocumentRequest !== null)
            .map(({ relatedDocumentRequest }) => ({ relatedDocumentRequest }));
        setDocumentRequests(notifications);
    }
    useEffect(() => {
        getAllNotifications();
    }, []);
    console.log(documentRequests);

    async function handleReadNotification(notificationId) {
        await axios.post(`http://localhost:8080/notifications/mark-as-read/${notificationId}`, {
            isRead: true,
        });
        setDocumentRequests((prevDocumentRequest) => {
            return prevDocumentRequest.map((notification) => {
                if (notification.notificationId === notificationId) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
        });
    }

    const fullName = user.firstName + " " + user.lastName;

    return (
        <div
            className="w-full p-8"
            style={{ backgroundImage: 'url("images/profileBackgroundImage.png")' }}
        >
            <h1 className="font-bold text-6xl p-5">Notification</h1>
            <div className="flex flex-col justify-start gap-4 rounded-[22px] p-7 bg-slate-50/80">
                <div className="flex">
                    <>
                        <img
                            src="/images/Notification.png"
                            alt="Notification Image"
                            className="w-7 h-7"
                        />
                    </>
                    <div className="mx-auto">
                        <img src="/images/logo.png" alt="" />
                    </div>
                </div>
                <div className="flex flex-col-reverse gap-4">
                    {welcomeMessage?.map(({ notificationId, isRead, message }) => (
                        <div key={notificationId}>
                            <p
                                onClick={() => handleReadNotification(notificationId)}
                                className={`flex items-center gap-1 p-5 rounded-2xl font-bold text-lg bg-gray-200 ${
                                    !isRead
                                        ? "border-2 border-rose-500 cursor-pointer"
                                        : "bg-gray-200"
                                }`}
                            >
                                <img src="/images/logo.png" alt="" className="w-16 mx-4" />
                                {message},{" "}
                                <i>
                                    <b>{fullName}!</b>
                                </i>
                            </p>
                        </div>
                    ))}
                    {documentRequests &&
                        documentRequests
                            .filter(
                                ({
                                    relatedDocumentRequest,
                                    relatedAppointmentRequest,
                                    relatedReportsFiling,
                                }) => {
                                    const documentStatus = relatedDocumentRequest?.documentStatus;
                                    const appointmentStatus =
                                        relatedAppointmentRequest?.appointmentStatus;
                                    const reportStatus = relatedReportsFiling?.reportStatus;
                                    const reportUpdate = relatedReportsFiling?.reportUpdate
                                    return (
                                        documentStatus === "Approved" ||
                                        documentStatus === "Denied" ||
                                        appointmentStatus === "Approved" ||
                                        appointmentStatus === "Denied" ||
                                        reportStatus === "Resolved" ||
                                        reportUpdate
                                    );
                                }
                            )
                            .map(
                                ({
                                    isRead,
                                    notificationId,
                                    relatedDocumentRequest,
                                    relatedAppointmentRequest,
                                    relatedReportsFiling,
                                }) => (
                                    <div key={notificationId}>
                                        {relatedDocumentRequest && (
                                            <ReusableNotificationComponent
                                                handleReadNotification={handleReadNotification}
                                                notificationId={notificationId}
                                                isRead={isRead}
                                                img={
                                                    relatedDocumentRequest?.documentStatus ===
                                                    "Approved"
                                                        ? "/images/notification/document_approved.png"
                                                        : "/images/notification/document_denied.png"
                                                }
                                                title="Document Request"
                                                firstDescription="We are pleased to inform you that your requested"
                                                contentStatus={
                                                    relatedDocumentRequest?.documentStatus
                                                }
                                                secondDescription="has been sanctioned for release. Please ensure to bring your valid ID when claiming your file."
                                                contentType={relatedDocumentRequest?.documentType}
                                            />
                                        )}
                                        {relatedAppointmentRequest && (
                                            <ReusableNotificationComponent
                                                handleReadNotification={handleReadNotification}
                                                notificationId={notificationId}
                                                isRead={isRead}
                                                img={
                                                    relatedAppointmentRequest?.appointmentStatus ===
                                                    "Approved"
                                                        ? "/images/notification/appointment_approved.png"
                                                        : "/images/notification/appointment_denied.png"
                                                }
                                                title="Appointment Set"
                                                firstDescription="We are pleased to confirm the scheduling of your"
                                                contentStatus={
                                                    relatedAppointmentRequest?.appointmentStatus
                                                }
                                                secondDescription="meeting on November 8, 2023. Kindly ensure your prompt attendance at the specified time."
                                                contentType={
                                                    relatedAppointmentRequest?.meetingFormat
                                                }
                                            />
                                        )}
                                        {relatedReportsFiling && (
                                            <ReusableNotificationComponent
                                                handleReadNotification={handleReadNotification}
                                                notificationId={notificationId}
                                                isRead={isRead}
                                                img="/images/notification/report_resolved.png"
                                                title="Report Filed"
                                                firstDescription="Your Bear Attack"
                                                contentStatus={relatedReportsFiling?.reportStatus}
                                                secondDescription="report has been filed. We appreciate your cooperation and will prioritize the resolution process, taking necessary actions if necessary."
                                                contentType={relatedReportsFiling?.reportType}
                                            />
                                        )}
                                    </div>
                                )
                            )}
                </div>
            </div>
        </div>
    );
}

function ReusableNotificationComponent({
    handleReadNotification,
    notificationId,
    isRead,
    img,
    title,
    firstDescription,
    contentStatus,
    secondDescription,
    contentType,
}) {
    return (
        <div
            onClick={() => handleReadNotification(notificationId)}
            className={`flex items-center gap-5 p-5 rounded-2xl bg-gray-200 ${
                !isRead ? "border-2 border-rose-500 cursor-pointer" : "bg-gray-200"
            }`}
        >
            <img src={img} alt="Document Image" className="w-30" />
            <div className="flex flex-col gap-1">
                <p className="font-bold text-lg">
                    {title} {contentStatus}!
                </p>
                <p className="text-md leading-4">
                    {firstDescription}{" "}
                    <b>
                        <i>{contentType}</i>
                    </b>{" "}
                    {secondDescription}
                </p>
            </div>
        </div>
    );
}
