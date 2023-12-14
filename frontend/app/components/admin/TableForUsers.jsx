export default function TableForUsers({
    title,
    firstName,
    lastName,
    middleInitial,
    email,
    address,
    contactNumber,
    isVerified,
    showIsVerified = true,
    showSvg = true,
    showCheckButton = true,
    handleApprove = () => {},
    showXButton = true,
    handleDeny = () => {},
    idFieldName,
    data,
}) {
    const showAddressColumn = data && data.length > 0 && "address" in data[0];

    return (
        <>
            <h1 className="my-8 text-2xl">{title}</h1>
            <table className="w-full text-center bg-slate-300 border-separate border border-slate-900">
                <thead>
                    <tr className="text-lg">
                        <th className="border border-slate-600 px-2 py-4">{firstName}</th>
                        <th className="border border-slate-600 px-2 py-4">{lastName}</th>
                        <th className="border border-slate-600 px-2 py-4">{middleInitial}</th>
                        <th className="border border-slate-600 px-2 py-4">{email}</th>
                        {showAddressColumn && (
                            <th className="border border-slate-600 px-2 py-4">{address}</th>
                        )}
                        <th className="border border-slate-600 px-2 py-4">{contactNumber}</th>
                        {showIsVerified && (
                            <th className="border border-slate-600 px-2 py-4">{isVerified}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((user) => (
                            <tr
                                key={user[idFieldName]}
                                className="text-center w-full bg-slate-500 text-white text-sm"
                            >
                                <td className="border border-slate-600 px-3 py-5">
                                    {user.firstName}
                                </td>
                                <td className="border border-slate-600 px-3 py-5">
                                    {user.lastName}
                                </td>
                                <td className="border border-slate-600 px-3 py-5">
                                    {user.middleInitial}
                                </td>
                                <td className="border border-slate-600 px-3 py-5">{user.email}</td>
                                {showAddressColumn && (
                                    <td className="border border-slate-600 px-3 py-5">
                                        {user.address}
                                    </td>
                                )}
                                <td className="border border-slate-600 px-3 py-5">
                                    {user.contactNumber}
                                </td>
                                {showIsVerified && (
                                    <td className="border border-slate-600">
                                        {showSvg && (
                                            <div className="flex justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        {showCheckButton && (
                                            <button
                                                onClick={() =>
                                                    handleApprove(user.firstName, user.residentId)
                                                }
                                                className="hover:bg-green-300 hover:animate-pulse p-2 rounded-lg"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                        {showXButton && (
                                            <button
                                                onClick={() =>
                                                    handleDeny(user.firstName, user.residentId)
                                                }
                                                className="hover:bg-red-300 hover:animate-pulse ml-3 p-2 rounded-lg"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
