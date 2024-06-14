import React, { useState, useEffect } from 'react';
import { workapprove, workareject, workforward, workback } from "../services/api/userworkApi";
import { toast , Toaster  } from "react-hot-toast";
const Comments = ({
  workflowDetail,
  setWorkflowDetail,
  comment,
  setComment,
  approveStatus,
  setApproveStatus,
  buttons
}) => {
  const [isForwardDisabled, setIsForwardDisabled] = useState(false);
  const [isBackDisabled, setIsBackDisabled] = useState(false);

  // Disable Forward and Back buttons if Approved or Rejected
  useEffect(() => {
    if (workflowDetail.status === "Approved" || workflowDetail.status === "Rejected") {
      setIsForwardDisabled(true);
      setIsBackDisabled(true);
    }
    console.log(buttons)
  }, [workflowDetail]);

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData._id;
    }
    return null;
  };

  const handleApprove = async () => {
    if (!workflowDetail) {
      console.error("No workflow detail available");
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) {
        setApproveStatus("User ID not found.");
        return;
      }

      const workflowId = workflowDetail._id;
      const { data, isError } = await workapprove(workflowId, userId, comment);
      console.log(workflowId)
      console.log(userId)
      console.log(comment)
      if (!isError) {
        setApproveStatus("Workflow approved successfully.");
        toast.success("Workflow approved successfully.");
        setWorkflowDetail(data.workflow);
        setIsForwardDisabled(true);
        setIsBackDisabled(true);
      } else {
        setApproveStatus("Error approving workflow.");
      }
    } catch (error) {
      console.error("Error approving workflow:", error);
      setApproveStatus("Error approving workflow.");
    }
  };

  const handleReject = async () => {
    if (!workflowDetail) {
      console.error("No workflow detail available");
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) {
        setApproveStatus("User ID not found.");
        return;
      }

      const workflowId = workflowDetail._id;
      const { data, isError } = await workareject(workflowId, userId, comment);
      if (!isError) {
        setApproveStatus("Workflow rejected successfully.");
        toast.success("Workflow rejected successfully.");
        setWorkflowDetail(data.workflow);
        setIsForwardDisabled(true);
        setIsBackDisabled(true);
      } else {
        setApproveStatus("Error rejecting workflow.");
      }
    } catch (error) {
      console.error("Error rejecting workflow:", error);
      setApproveStatus("Error rejecting workflow.");
    }
  };

  const handleForward = async () => {
    if (!workflowDetail) {
      console.error("No workflow detail available");
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) {
        setApproveStatus("User ID not found.");
        return;
      }

      const workflowId = workflowDetail._id;
      const { data, isError } = await workforward(workflowId, userId, comment);
      if (!isError) {
        setApproveStatus("Workflow forwarded successfully.");
        toast.success("Workflow forwarded successfully.");
        setWorkflowDetail(data.workflow);
        setIsForwardDisabled(true);
      } else {
        setApproveStatus("Error forwarding workflow.");
      }
    } catch (error) {
      console.error("Error forwarding workflow:", error);
      setApproveStatus("Error forwarding workflow.");
    }
  };

  const handleBack = async () => {
    if (!workflowDetail) {
      console.error("No workflow detail available");
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) {
        setApproveStatus("User ID not found.");
        return;
      }

      const workflowId = workflowDetail._id;
      const { data, isError } = await workback(workflowId, userId, comment);
      if (!isError) {
        setApproveStatus("Workflow sent back successfully.");
        toast.success("Workflow sent back successfully.");
        setWorkflowDetail(data.workflow);
        setIsBackDisabled(true);
      } else {
        setApproveStatus("Error sending workflow back.");
      }
    } catch (error) {
      console.error("Error sending workflow back:", error);
      setApproveStatus("Error sending workflow back.");

    }
  };

  return (
    <div className="comments-container h-auto w-80 border border-gray-300 rounded-lg shadow-md my-9 flex flex-col p-4 gap-4 bg-white">
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <h5 className="text-teal-600 font-semibold">Comments/Feedback</h5>
      <textarea
        className="w-full h-20 border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {workflowDetail.status !== "Approved" && workflowDetail.status !== "Rejected" && buttons.canApprove && (
        <div className="flex gap-4">
          <button
            className="w-1/2 h-9 border border-teal-500 rounded-md text-teal-500 text-sm hover:bg-teal-500 hover:text-white transition"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="w-1/2 h-9 border border-red-500 rounded-md text-red-600 text-sm hover:bg-red-500 hover:text-white transition"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      )}

      <h5 className="text-teal-600 font-semibold">Progression</h5>
      <div className="flex gap-4">
        <button
          onClick={handleForward}
          className={`w-1/2 h-9 border border-gray-400 rounded-md text-sm ${
            isForwardDisabled || !buttons.canMoveForward ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:bg-gray-200"
          }`}
          disabled={isForwardDisabled || !buttons.canMoveForward}
        >
          Forward
        </button>
        <button
          onClick={handleBack}
          className={`w-1/2 h-9 border border-gray-400 rounded-md text-sm ${
            isBackDisabled || !buttons.canMoveBackward ? "text-gray-200 cursor-not-allowed" : "text-gray-500 hover:bg-gray-200"
          }`}
          disabled={isBackDisabled || !buttons.canMoveBackward}
        >
          Back
        </button>
      </div>

      <div className="mt-4">
        {workflowDetail.comments && workflowDetail.comments.length > 0 ? (
          <div className="flex flex-col gap-4 comments-list">
            {workflowDetail.comments.map((commentObj, index) => (
              <div key={index} className="comment-card border border-gray-200 rounded-md p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Stage: {commentObj.stageIndex}</span>
                  <span>{new Date(commentObj.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-800 mt-2">{commentObj.comment}</p>
                {/* <div className="text-sm text-gray-500 mt-2">
                  <p>From: {commentObj.fromUser._id}</p>
                  <p>To: {commentObj.toUser._id}</p>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments available.</p>
        )}
      </div>

      {approveStatus && <p className="text-red-600 mt-4">{approveStatus}</p>}
    </div>
  );
};

export default Comments;