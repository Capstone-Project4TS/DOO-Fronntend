import React, { useState } from 'react';
import { Link } from "@tanstack/react-router";
import pdf from '/asset/icons/pdf.svg';
import visible from '/asset/icons/visible.svg';
import downloadIcon from '/asset/icons/download.svg';

const DocumentDetailsCard = ({ doc }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleDownload = async () => {
    if (!doc || !doc.filePath) {
      console.error('Invalid document or file path');
      return;
    }
    console.log(doc.filePath);
    try {
      const response = await fetch(doc.filePath);
      const blob = await response.blob();
      const filename = `${doc.name || 'document'}.pdf`;
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = window.document.createElement('a');
        anchor.download = filename;
        anchor.href = blobUrl;
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (!doc) {
    return <div>Loading...</div>;
  }

  // Check if doc.filePath exists
  const hasFilePath = !!doc.filePath;
  console.log(doc.filePath);

 // ...
return (
  <div className="flex justify-between items-center p-4 border rounded shadow">
    <div className="flex gap-6 items-center">
      <img src={pdf} alt="PDF Icon" className="w-8 h-8" />
      <h5 className="text-teal-600">{doc.name || 'Document'}</h5>
    </div>
    <div className="flex gap-6 items-center">
      {isVisible && doc.filePath && (
        <div className="relative" style={{ width: '200px', height: '200px' }}>
          <iframe
            src={doc.filePath}
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
          ></iframe>
        </div>
      )}
      {doc.filePath && (
        <Link to={`/fulldocument/${encodeURIComponent(doc.filePath)}`}>
          <img src={visible} style={{ cursor: 'pointer' }} alt="Visibility Icon" onClick={toggleVisibility} />
        </Link>
      )}
      {doc.filePath && (
        <img src={downloadIcon} alt="Download Icon" style={{ cursor: 'pointer' }} onClick={handleDownload} />
      )}
    </div>
  </div>
);

};

export default DocumentDetailsCard;