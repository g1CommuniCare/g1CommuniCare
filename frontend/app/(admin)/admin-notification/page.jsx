"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Notification() {
    const [documentRequest, setDocumentRequest] = useState(null);

    async function getDocumentRequestFromResident() {
        const res = await axios("http://localhost:8080/notifications/getAllNotifications");
        const data = res.data;

        // THIS IS HOW TO FILTER THE DATA
        // const filteredDocuments = data
        //     ?.map(({ relatedDocumentRequest, relatedAppointmentRequest }) => ({
        //         relatedDocumentRequest,
        //         relatedAppointmentRequest,
        //     }))
        //     .filter(
        //         ({ relatedDocumentRequest, relatedAppointmentRequest }) =>
        //             relatedDocumentRequest !== null || relatedAppointmentRequest !== null
        //     );
        // const resident = filteredDocuments?.map(
        //     ({ relatedDocumentRequest, relatedAppointmentRequest }) => ({
        //         relatedDocumentRequest: relatedDocumentRequest,
        //         relatedAppointmentRequest: relatedAppointmentRequest,
        //     })
        // );
        // console.log(filteredDocuments);
        setDocumentRequest(data);
    }

    useEffect(() => {
        getDocumentRequestFromResident();
    }, []);
    console.log(documentRequest);

    async function handleReadNotification(notificationId) {
        await axios.post(`http://localhost:8080/notifications/mark-as-read/${notificationId}`, {
            isRead: true,
        });
        setDocumentRequest((prevDocumentRequest) => {
            return prevDocumentRequest.map((notification) => {
                if (notification.notificationId === notificationId) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
        });
    }

    return (
        <div
            className="w-full p-8"
            style={{ backgroundImage: 'url("images/profileBackgroundImage.png")' }}
        >
            <h1 className="font-bold text-6xl pb-10">Notification</h1>
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
                    {documentRequest &&
                        documentRequest
                            .filter(
                                ({
                                    relatedDocumentRequest,
                                    relatedAppointmentRequest,
                                    relatedReportsFiling,
                                }) =>
                                    relatedDocumentRequest !== null ||
                                    relatedAppointmentRequest !== null ||
                                    relatedReportsFiling !== null
                            )
                            .map(
                                ({
                                    notificationId,
                                    isRead,
                                    relatedDocumentRequest,
                                    relatedAppointmentRequest,
                                    relatedReportsFiling,
                                }) => (
                                    <div
                                        key={notificationId}
                                        onClick={() => handleReadNotification(notificationId)}
                                        className={`flex items-center gap-5 p-5 rounded-2xl bg-gray-200 ${
                                            !isRead
                                                ? "border-2 border-rose-500 cursor-pointer"
                                                : "bg-gray-200"
                                        }`}
                                    >
                                        {relatedDocumentRequest && (
                                            <ReusableNotificationComponent
                                                img="/images/notification/document.png"
                                                altImg="Document Image"
                                                notifcationTitle="Document Request Type:"
                                                notificationContent={
                                                    relatedDocumentRequest?.documentType
                                                }
                                                residentInfo={
                                                    relatedDocumentRequest?.resident
                                                        ? relatedDocumentRequest?.resident
                                                        : null
                                                }
                                            />
                                        )}
                                        {relatedAppointmentRequest && (
                                            <ReusableNotificationComponent
                                                img="/images/notification/appointment.png"
                                                altImg="Appointment Image"
                                                notifcationTitle="Department & Meeting:"
                                                notificationContent={`${
                                                    relatedAppointmentRequest?.department
                                                } &&${" "}
                                        ${relatedAppointmentRequest?.meetingFormat}`}
                                                residentInfo={
                                                    relatedAppointmentRequest?.resident
                                                        ? relatedAppointmentRequest?.resident
                                                        : null
                                                }
                                            />
                                        )}
                                        {relatedReportsFiling && (
                                            <ReusableNotificationComponent
                                                img="/images/notification/report_filing.png"
                                                altImg="Report Filing Image"
                                                notifcationTitle="Report Type:"
                                                notificationContent={
                                                    relatedReportsFiling.reportType
                                                }
                                                residentInfo={
                                                    relatedReportsFiling?.resident
                                                        ? relatedReportsFiling?.resident
                                                        : null
                                                }
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
    img,
    altImg,
    notifcationTitle,
    notificationContent,
    residentInfo,
}) {
    return (
        <>
            <img src={img} alt={altImg} className="w-30" />
            <div className="flex justify-evenly flex-col w-full h-full">
                <p className="flex items-center gap-3 text-lg font-medium">
                    <span className="font-bold">{notifcationTitle}</span>{" "}
                    <i>{notificationContent}</i>
                </p>
                {residentInfo && (
                    <p className="font-medium">
                        Resident's Fullname: {residentInfo.firstName} {residentInfo.lastName}
                    </p>
                )}
            </div>
        </>
    );
}
