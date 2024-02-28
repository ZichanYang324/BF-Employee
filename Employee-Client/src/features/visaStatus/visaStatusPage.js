// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDocumentStatus, uploadDocument } from './visaStatusSlice';

// const VisaStatusPage = () => {
//   const { documents, status, error } = useSelector((state) => state.visaStatus);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchDocumentStatus());
//   }, [dispatch]);

//   const handleFileUpload = (event, documentType) => {
//     const file = event.target.files[0];
//     if (file) {
//       dispatch(uploadDocument({ documentType, file }));
//     }
//   };

//   if (status === 'loading') return <div>Loading documents...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Visa Status Management</h1>
//       {documents.map((doc, index) => (
//         <div key={index}>
//           <h2>{doc.type}</h2>
//           <p>Status: {doc.status}</p>
//           {/* Conditional rendering based on document status */}
//           {doc.status === 'Pending' && <p>Waiting for HR to approve your {doc.type}</p>}
//           {doc.status === 'Approved' && doc.type !== 'I-20' && (
//             <div>
//               <p>Please upload the next document.</p>
//               <input type="file" onChange={(event) => handleFileUpload(event, doc.nextDocumentType)} />
//             </div>
//           )}
//           {doc.status === 'Rejected' && (
//             <div>
//               <p>Feedback: {doc.feedback}</p>
//               <p>Please correct the issues and upload again.</p>
//               <input type="file" onChange={(event) => handleFileUpload(event, doc.type)} />
//             </div>
//           )}
//           {doc.status === 'Approved' && doc.type === 'I-20' && (
//             <p>All documents have been approved.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VisaStatusPage;
