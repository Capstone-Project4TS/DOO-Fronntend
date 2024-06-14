import React from 'react';
import download from '/asset/icons/download.svg';
import pdf from '/asset/icons/pdf.svg';
import visible from '/asset/icons/visible.svg';
import { Link } from '@tanstack/react-router';

interface DocumentDetailsCardProps {
  name: string;
  link:string
}

const DocumentDetailsCard: React.FC<DocumentDetailsCardProps> = (props) => {
  return (
    <div className="flex justify-between border-b pb-4"> 
      <Link to={props.link} className="flex gap-5 items-center">
        <img src={pdf} className='h-4' alt="PDF Icon"/>
        <h5 className="text-teal-600 text-sm">{props.name}</h5>
      </Link>
    
    </div>
  );
};

export default DocumentDetailsCard;
