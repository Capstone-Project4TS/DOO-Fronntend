import React, { useEffect, useState } from 'react';
import { fetchFolderHierarchy } from '../services/api/folderApi';
import FolderTree from './FolderTree';

interface Workflow {
  workflowId: string;
  userId: string;
  userIds: string[];
}

interface Folder {
  name: string;
  workflows: Workflow[];
  children: Folder[];
}

interface UserData {
  _id: string;
}

const FolderTreeContainer: React.FC = () => {
  const [data, setData] = useState<Folder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFolderHierarchy();
        if (!response.isError) {
          setData(response.data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch folder hierarchy');
        }
      } catch (error) {
        console.error('Error fetching folder hierarchy:', error);
        setLoading(false);
      }
    };

    fetchData();
    
    const user = localStorage.getItem("user");
    const userData: UserData | null = user ? JSON.parse(user) : null;
    setUserId(userData?._id);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">No Repository available</div>;
  }

  return <FolderTree data={data} userId={userId} />;
};

export default FolderTreeContainer;
