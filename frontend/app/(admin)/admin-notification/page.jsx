"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Notification() {
    const [documentRequest, setDocumentRequest] = useState(null);
    useEffect(() => {
        async function getDocumentRequestFromResident() {
            const res = await axios("http://localhost:8080/notifications/getAllNotifications");
            const data = res.data;

            // THIS IS HOW TO FILTER THE DATA
            // const filteredDocuments = data
            //     ?.map(({ relatedDocumentRequest }) => ({
            //         relatedDocumentRequest,
            //     }))
            //     .filter((document) => document.relatedDocumentRequest !== null);
            // const resident = filteredDocuments?.map(({ relatedDocumentRequest }) => ({
            //     resident: relatedDocumentRequest.resident,
            // }));
            // console.log(resident);
            // console.log(filteredDocuments);
            setDocumentRequest(data);
        }
        getDocumentRequestFromResident();
    }, []);
    console.log(documentRequest);

    // IS READ PARA SA UI
    const [isRead, setIsRead] = useState(false);
    async function handleReadNotification(notificationId) {
        await axios.post(`http://localhost:8080/notifications/mark-as-read/${notificationId}`);
        setIsRead(true);
        setDocumentRequest((prevDocumentRequest) => {
            return prevDocumentRequest.map((notification) => {
                if (notification.notificationId === notificationId) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
        });
    }
    console.log(isRead);

    return (
        <div
            className="w-full hfu p-8"
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
                            .filter(({ relatedDocumentRequest }) => relatedDocumentRequest !== null)
                            .map(({ notificationId, isRead, relatedDocumentRequest }) => (
                                <div
                                    key={notificationId}
                                    onClick={() => handleReadNotification(notificationId)}
                                    className={`flex items-center gap-5 p-5 rounded-2xl bg-gray-200 ${
                                        !isRead
                                            ? "border-2 border-rose-500 cursor-pointer"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <img
                                        src="/images/notification/document.png"
                                        alt="Document Image"
                                        className=""
                                    />
                                    <div className="flex justify-evenly flex-col w-full h-full">
                                        <p className="flex items-center gap-3 text-lg font-medium">
                                            <span className="font-bold">
                                                Document Request Type:
                                            </span>{" "}
                                            <i>{relatedDocumentRequest.documentType}</i>
                                        </p>
                                        {relatedDocumentRequest.resident && (
                                            <p className="font-medium">
                                                Resident's Fullname:{" "}
                                                {relatedDocumentRequest.resident.firstName}{" "}
                                                {relatedDocumentRequest.resident.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}
