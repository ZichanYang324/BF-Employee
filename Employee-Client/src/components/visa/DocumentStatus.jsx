// src/components/visa/DocumentStatus.js
import React from 'react';

// const DocumentUpload = ({ onUpload, documentType }) => {
//   return (
//     <div>
//       <input
//         type="file"
//         onChange={onUpload}
//         style={{ display: 'block', margin: '10px 0' }}
//       />
//     </div>
//   );
// };
const documentTypes = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

const DocumentStatus = ({ document }) => {
  const currentIndex = documentTypes.indexOf(document.type);
    const nextIndex = currentIndex + 1;
  const renderStatusMessage = (document) => {
    switch (document.status) {
      case 'Pending':
        return <p>Waiting for HR to approve your {document.type}.</p>;
      case 'Approved':
        if (document.type != "I-20") {
          return (
            <>
              <p>{document.type} is approved. Please upload your {documentTypes[nextIndex]}.</p>
              {/* <DocumentUpload documentType={document.nextDocumentType} onUpload={(e) => handleFileUpload(e, document.nextDocumentType)} /> */}
            </>
          );
        } else {
          return <p>All documents have been approved.</p>;
        }
      case 'Rejected':
        return (
          <>
            <p>Your {document.type} was rejected. Feedback: {document.feedback}</p>
            {/* Optionally add a retry upload button or further instructions here */}
          </>
        );
      default:
        return <p>Status unknown for {document.type}.</p>;
    }
  };

  return (
    <div className="document-status">
      <h3>{document.type}</h3>
      {renderStatusMessage(document)}
    </div>
  );
};

export default DocumentStatus;
