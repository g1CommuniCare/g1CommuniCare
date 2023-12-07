"use client"
import AdminSecondRow from "@/app/utils/admin/AdminSecondRow";
import AdminThirdRow from "@/app/utils/admin/AdminThirdRow";
import "../../css/admin.css";
import PieChartComponent from "@/app/components/PieChartComponent";
import { useState ,useEffect } from "react";

export default function Dashboard() {
    const [docReqDataApproved, setdocReqDataApproved] = useState(null);
    const [docReqDataPending, setdocReqDataPending] = useState(null);
    const [docReqDataDenied, setdocReqDataDenied] = useState(null);
    
    const [repTotalData, setrepTotalData] = useState(null);
    const [repResolvedData, setrepResolvedData] = useState(null);
    const [repPendingData, setrepPendingData] = useState(null);

    const [appApprovedData, setappApprovedData] = useState(null);
    const [appPendingData, setappPendingData] = useState(null);
    const [appDeniedData, setappDeniedData] = useState(null);

    // Fetch data for pending, approved, and denied requests
    const fetchDocReqStats = async () => {
        const resApproved = await fetch('http://localhost:8080/document-requests/total-approved');
        const docReqDataApproved = await resApproved.json();
        setdocReqDataApproved(docReqDataApproved); // Set the data in state

        const resPending = await fetch('http://localhost:8080/document-requests/total-pending');
        const docReqDataPending = await resPending.json();
        setdocReqDataPending(docReqDataPending); // Set the data in state

        const resDenied = await fetch('http://localhost:8080/document-requests/total-denied');
        const docReqDataDenied = await resDenied.json();
        setdocReqDataDenied(docReqDataDenied); // Set the data in state
    };

    useEffect(() => {
        fetchDocReqStats(); // Fetch data when the component mounts
    }, []);

    const fetchRepReqStats = async () => {
        const repTotal = await fetch('http://localhost:8080/reports-filing/total-reports');
        const repTotalData = await repTotal.json();
        setrepTotalData(repTotalData); // Set the data in state

        const repResolved = await fetch('http://localhost:8080/reports-filing/total-resolved');
        const repResolvedData = await repResolved.json();
        setrepResolvedData(repResolvedData); // Set the data in state

        const repPending = await fetch('http://localhost:8080/reports-filing/total-pending');
        const repPendingData = await repPending.json();
        setrepPendingData(repPendingData); // Set the data in state
    };

    useEffect(() => {
        fetchRepReqStats(); // Fetch data when the component mounts
    }, []);


    const fetchAppReqStats = async () => {
        const appApproved = await fetch('http://localhost:8080/appointment-requests/total-approved');
        const appApprovedData = await appApproved.json();
        setappApprovedData(appApprovedData); // Set the data in state

        const appPending = await fetch('http://localhost:8080/appointment-requests/total-pending');
        const appPendingData = await appPending.json();
        setappPendingData(appPendingData); // Set the data in state

        const appDenied = await fetch('http://localhost:8080/appointment-requests/total-denied');
        const appDeniedData = await appDenied.json();
        setappDeniedData(appDeniedData); // Set the data in state
    };

    useEffect(() => {
        fetchAppReqStats(); // Fetch data when the component mounts
    }
    , []);


    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:8080/bulletin/getAllBulletinPosts');
          const data = await response.json();
          // Assuming the latest post is the last in the array, reverse the array after slicing
          const latestPosts = data.slice(-4).reverse();
          setPosts(latestPosts);
        } catch (error) {
          // Handle any errors here
          console.error('Failed to fetch posts:', error);
        }
      };
    
      fetchPosts();
    }, []);

    return (
        <div className="w-full">
            <div className="container mx-auto mt-8 w-full">
                <div className="flex space-x-5">
                    <div className="bg-white h-full w-1/2 border border-DDE1E6 p-4">
                        <AdminSecondRow
                            pieChartComponent={<PieChartComponent data={[docReqDataApproved, docReqDataPending, docReqDataDenied]} />} // Pass PieChartComponent as a prop
                            title="Document Request"
                            firstRow="Approved Requests"
                            firstRowNumber={docReqDataApproved}
                            secondRow="Pending Requests"
                            secondRowNumber={docReqDataPending}
                            thirdRow="Denied Requests"
                            thirdRowNumber={docReqDataDenied}
                        />
                    </div>

                    <div className="bg-white h-full w-1/2 border border-DDE1E6 p-4">
                        <AdminSecondRow
                            pieChartComponent={<PieChartComponent data={[repTotalData, repResolvedData, repPendingData]} />}
                            title="Reports Filed"
                            firstRow="Total Reports Filed"
                            firstRowNumber={repTotalData}
                            secondRow="Resolved Reports"
                            secondRowNumber={repResolvedData}
                            thirdRow="Pending Reports"
                            thirdRowNumber={repPendingData}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-8 w-full">
                <div className="flex space-x-5">
                    <div className="bg-white h-[500px] w-1/2 p-5 border border-DDE1E6">
                        <div className="flex flex-col h-full justify-between">
                            <span className="font-bold text-xl">Community Bulletin Engagement</span>
                            {posts.map((post) => (
                                <div key={post.postId} className="container h-[90px] w-full py-4 pl-5 pr-10 bg-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold">{post.postTitle}</div>
                                    <div className="text-md font-style: italic text-black">{`${post.admin.firstName} ${post.admin.middleInitial} ${post.admin.lastName}`}</div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-2xl text-green-500 mr-2">↑ {post.upvoteCount}</span>
                                    <span className="text-2xl text-red-500">↓ {post.downvoteCount}</span>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 ">
                        <div className="bg-white h-[300px] w-full border border-DDE1E6 p-5">
                            <AdminSecondRow
                                pieChartComponent={<PieChartComponent data={[appApprovedData, appPendingData, appDeniedData]} />}
                                title="Appointment Request"
                                firstRow="Approved Requests"
                                firstRowNumber={appApprovedData}
                                secondRow="Pending Requests"
                                secondRowNumber={appPendingData}
                                thirdRow="Denied Requests"
                                thirdRowNumber={appDeniedData}
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
