export default function SkeletonTable({
    title,
    firstName,
    lastName,
    middleInitial,
    email,
    address,
    contactNumber,
}) {

    return (
        <div>
            <h1 className="my-8 text-2xl">{title}</h1>
            <table className="table-fixed w-full text-center bg-slate-300 border-separate border border-slate-900">
                <thead>
                    <tr className="text-lg">
                        <th className="border border-slate-600 p-2">{firstName}</th>
                        <th className="border border-slate-600 p-2">{lastName}</th>
                        <th className="border border-slate-600 p-2">{middleInitial}</th>
                        <th className="border border-slate-600 p-2">{email}</th>
                        <th className="border border-slate-600 p-2">{address}</th>
                        <th className="border border-slate-600 p-2">{contactNumber}</th>
                    </tr>
                </thead>
                <tbody className="animate-pulse text-center bg-slate-500 text-white">
                    <tr>
                        <td className="border border-slate-600 p-5"></td>
                        <td className="border border-slate-600 p-5"></td>
                        <td className="border border-slate-600 p-5"></td>
                        <td className="border border-slate-600 p-5"></td>
                        <td className="border border-slate-600 p-5"></td>
                        <td className="border border-slate-600 p-5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
