import AdminFirstRow from "@/app/utils/admin/AdminFirstRow";
import Link from "next/link";

export default function SubNavbar() {
    return (
        <div>
            <div className="text-5xl pb-10 font-bold">Dashboard</div>
            <div className="flex space-x-5 h-[90px]">
                <Link
                    href="/admin-dashboard/total-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/people-people.png"}
                        title="Total Users"
                        numbers="12,233"
                    />
                </Link>

                <Link
                    href="/admin-dashboard/verified-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/checked-user-male.png"}
                        title="Verified Users"
                        numbers="10,250"
                    />
                </Link>

                <Link
                    href="/admin-dashboard/pending-users"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow
                        img={"/admin/delete-user.png"}
                        title="Pending Users"
                        numbers="2,028"
                    />
                </Link>

                <Link
                    href="/admin-dashboard/admins"
                    className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6"
                >
                    <AdminFirstRow img={"/admin/admin.png"} title="Admins" numbers="6" />
                </Link>
            </div>
        </div>
    );
}
