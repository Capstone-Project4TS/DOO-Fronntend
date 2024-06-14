import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';

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

interface FolderTreeProps {
  data: Folder;
  userId: string | null;
}

const FolderTree: React.FC<FolderTreeProps> = ({ data, userId }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWorkflowClick = (workflow: Workflow) => {
    if (!userId) return; // No user logged in, do nothing

    if (workflow.userId === userId) {
      window.location.href = `/assignedbymedetails/${workflow.workflowId}`;
    } else if (workflow.userIds.includes(userId)) {
      window.location.href = `/assignedtomedetails/${workflow.workflowId}`;
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-200 transition duration-200"
        onClick={handleToggle}
      >
        {isExpanded ? (
          <FolderOpenIcon className="text-purple-900 mr-2" />
        ) : (
          <FolderIcon className="text-purple-900 mr-2" />
        )}
        <div className="text-gray-600 font-semibold">{data.name}</div>
      </div>
      {isExpanded && (
        <div className="ml-6 border-l-2 border-gray-300 pl-4 mt-2 transition-all duration-300">
          {data.workflows && data.workflows.length > 0 && (
            <div className="mt-2">
              {data.workflows.map((workflow) => (
                <div
                  key={workflow.workflowId}
                  className="text-gray-600 font-medium cursor-pointer"
                  onClick={() => handleWorkflowClick(workflow)}
                >
                  <DescriptionIcon className="text-gray-500 mr-1" />
                  Workflow: {workflow.workflowId}
                </div>
              ))}
            </div>
          )}
          {data.children && data.children.length > 0 && (
            <div className="mt-2">
              {data.children.map((child, index) => (
                <FolderTree key={index} data={child} userId={userId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
