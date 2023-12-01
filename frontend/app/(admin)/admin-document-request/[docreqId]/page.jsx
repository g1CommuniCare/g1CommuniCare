// // //pages/admin-document-request/[docreqId].js
// // 'use client';
// // import axios from 'axios';

// // const DocumentRequestDetail = ({docreqId}) => {
// //   const [requestData, setRequestData] = useState(null);
// //     console.log("requestData: ", requestData);

// //     async function fetchData() {
// //         const res = await fetch(`http://localhost:8080/document-requests/doc-req/${docreqId}`);
// //         const data = await res.json();
// //         setRequestData(data);
// //         console.log("data: ", data);
// //     }
// //     useEffect(() => {
// //         fetchData();
// //     }, []);
// //   if (!requestData) {
// //     return <div>Loading...</div>;
// //   }
// //   console.log("docreqId: ", docreqId);
// //   return (
// //     <div>
// //       <h1>Request Details</h1>
// //       {/* <p>Document Request ID: {requestData.docreqId}</p>
// //       <p>Resident Name: {`${requestData.resident.firstName} ${requestData.resident.middleInitial} ${requestData.resident.lastName}`}</p>
// //       <p>Resident ID: {`RES-${requestData.resident.residentId}`}</p>
// //       <p>Email: {requestData.resident.email}</p> */}
// //       {/* Display other request details here using `requestData` */}
// //     </div>
// //   );
// // };

// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const DocumentRequestDetail = () => {
//   const [requestData, setRequestData] = useState(null);
//   const [loading, setLoading] = useState(true); // Add a loading state
//   const [error, setError] = useState(null);     // Add an error state
//   const router = useRouter();

//   useEffect(() => {
//     if (router.isReady) {
//       const { docreqId } = router.query;
//       async function fetchData() {
//         try {
//           console.log(`Fetching data for docreqId: ${docreqId}`); // Log the docreqId
//           const res = await fetch(`http://localhost:8080/document-requests/doc-req/${docreqId}`);
//           if (!res.ok) {
//             throw new Error(`Error: ${res.status}`); // Throw an error for bad responses
//           }
//           const data = await res.json();
//           setRequestData(data);
//           console.log('Data fetched', data); // Log the fetched data
//         } catch (err) {
//           console.error('Failed to fetch data', err);
//           setError(err.message); // Set the error state
//         } finally {
//           setLoading(false); // Set loading to false regardless of outcome
//         }
//       }
//       fetchData();
//     }
//   }, [router.isReady]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Display errors if any
//   }

//   if (!requestData) {
//     return <div>No data found.</div>; // Handle the case where there is no data
//   }
//   return (
//     <div>
//       <h1>Request Details</h1>
//       {/* <p>Document Request ID: {requestData.docreqId}</p>
//       <p>Resident Name: {`${requestData.resident.firstName} ${requestData.resident.middleInitial} ${requestData.resident.lastName}`}</p>
//       <p>Resident ID: {`RES-${requestData.resident.residentId}`}</p>
//       <p>Email: {requestData.resident.email}</p> */}
//       {/* Display other request details here using `requestData` */}
//     </div>
//   );
// };
// export default DocumentRequestDetail;

export async function generateStaticParams(){
  const res = await fetch('http://localhost:8080/document-requests/all-document-requests')
  const data = await res.json()
  return data.map((docreq) => ({
    docreqId: docreq.docreqId.toString(),
  }))
}

import React from 'react'

async function getProduct(docreqId){
  const res = await fetch(`http://localhost:8080/document-requests/doc-req/${docreqId}`)
  const data = await res.json()
  // console.log(data.docreqId)
  const image = data?.docreqId
  //console.log(image)
  return data
}

export default async function page({params}) {
  const data = await getProduct(params.id)
  console.log({data})
  return (
    <div>Product</div>
  )
}
