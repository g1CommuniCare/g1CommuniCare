import AdminSecondRow from "@/app/utils/admin/AdminSecondRow";
import AdminThirdRow from "@/app/utils/admin/AdminThirdRow";
import "../../css/admin.css";

export default function Dashboard() {
    return (
        <div className="w-full">
            <div className="container mx-auto mt-8 w-full">
                <div className="flex space-x-5">
                    <div className="bg-white h-full w-1/2 border border-DDE1E6 p-4">
                        <AdminSecondRow
                            img="admin/chart-docu-request.svg"
                            title="Document Request"
                            firstRow="Approved Requests"
                            firstRowNumber="2,230"
                            secondRow="Pending Requests"
                            secondRowNumber="1,130"
                            thirdRow="Denied Requests"
                            thirdRowNumber="112"
                        />
                    </div>

                    <div className="bg-white h-full w-1/2 border border-DDE1E6 p-4">
                        <AdminSecondRow
                            img="admin/chart-docu-request.svg"
                            title="Document Request"
                            firstRow="Total Reports Filed"
                            firstRowNumber="4,755"
                            secondRow="Resolved Reports"
                            secondRowNumber="3,530"
                            thirdRow="Pending Reports"
                            thirdRowNumber="1,225"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8 w-full">
                <div className="flex space-x-5">
                    <div className="bg-white h-[500px] w-1/2 p-5 border border-DDE1E6">
                        <div className="flex flex-col h-full justify-between">
                            <span className="font-bold text-xl">Community Bulletin Engagement</span>

                            <div className="container h-[90px] w-full p-4 bg-gray-100 flex">
                                <AdminThirdRow
                                    title="Barangay Clean-Up Day"
                                    author="Bianca Jessa Carabio"
                                    upvotes="156"
                                    downvotes="03"
                                />
                            </div>

                            <div className="container h-[90px] w-full p-4 bg-gray-100 flex">
                                <AdminThirdRow
                                    title="Road Maintenance Notice"
                                    author="Joshua Jhonn B. Borres"
                                    upvotes="213"
                                    downvotes="109"
                                />
                            </div>

                            <div className="container h-[90px] w-full p-4 bg-gray-100 flex">
                                <AdminThirdRow
                                    title="Fire Safety Awareness"
                                    author="France Gieb S. Mier"
                                    upvotes="312"
                                    downvotes="01"
                                />
                            </div>

                            <div className="container h-[90px] w-full p-4 bg-gray-100 flex">
                                <AdminThirdRow
                                    title="Monthly Barangay Meeting"
                                    author="Bermar Villarazo Jr."
                                    upvotes="314"
                                    downvotes="00"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 ">
                        <div className="bg-white h-[300px] w-full border border-DDE1E6 p-5">
                            <AdminSecondRow
                                img="admin/chart-docu-request.svg"
                                title="Appointment Request"
                                firstRow="Approved Requests"
                                firstRowNumber="1,025"
                                secondRow="Pending Requests"
                                secondRowNumber="604"
                                thirdRow="Denied Requests"
                                thirdRowNumber="34"
                            />
                        </div>
                        <div className="flex justify-center mt-4 h-[183px] w-full bg-white border border-DDE1E6">
                            <img
                                src="images/communicare-logo-tagline.png"
                                alt="CommuniCare"
                                className="w-4/5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
