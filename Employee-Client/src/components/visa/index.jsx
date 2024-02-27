import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocumentStatus, uploadDocument } from '../../features/visaStatus/visaStatusSlice'; // Ensure uploadDocument is imported
import DocumentStatus from './DocumentStatus';

const VisaStatusManagement = () => {
  const { documents, status, error } = useSelector((state) => state.visaStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocumentStatus());
  }, [dispatch]);

  const handleFileUpload = (event, documentType) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadDocument({ documentType, file }));
    }
  };

//   if (status === 'loading') return <div>Loading documents...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (documents.length === 0 && status === 'succeeded') {
//     return <div>No documents found. Start by uploading your first document.</div>;
//   }
  return (
    <div>
      <h1>Visa Status Management</h1>
      {status === 'loading' && <p>Loading...</p>}
    {status === 'failed' && <p>Error: {error}</p>}
        {documents.length === 0 && status === 'succeeded' && <div>No documents found. Start by uploading your first document.</div>}
      {documents.map((doc, index) => (
        <DocumentStatus key={index} document={doc} handleFileUpload={handleFileUpload} />
      ))}
    </div>
  );

//   return (
//     <div>
//       <h2>Visa Status Management</h2>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p>Error: {error}</p>}
//       {documents.length === 0 && status === 'succeeded' && <div>No documents found. Start by uploading your first document.</div>}
//       {documents.map((document) => (
//         <DocumentStatus
//           key={document.type}
//           document={document}
//           handleFileUpload={handleFileUpload}
//         />
//       ))}
//     </div>
//   );

};

export default VisaStatusManagement;
