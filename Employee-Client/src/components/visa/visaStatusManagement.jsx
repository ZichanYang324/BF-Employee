// src/components/visa/VisaStatusManagement.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocumentStatus, uploadDocument } from '../../features/visaStatus/visaStatusSlice';
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

  return (
    <div>
      <h2>Visa Status Management</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {documents.map((document) => (
        <DocumentStatus
          key={document.type}
          document={document}
          handleFileUpload={handleFileUpload}
        />
      ))}
    </div>
  );
};

export default VisaStatusManagement;
