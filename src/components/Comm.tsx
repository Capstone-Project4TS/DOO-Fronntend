import React from 'react';
import Avatar from '../../public/asset/icons/avatar.svg';

interface CommProps {
  name: string;
  time: string;
  details: string;
}

const Comm: React.FC<CommProps> = ({ name, time, details }) => {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-500 border-opacity-20 py-2">
      <div className="flex items-center gap-4">
        <img src={Avatar} alt="Avatar" />
        <h3>{name}</h3>
        <p className="text-xs text-gray-600">{time}</p>
      </div>
      <div className="pl-12 text-xs text-gray-500">{details}</div>
    </div>
  );
}

export default Comm;
