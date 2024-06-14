// AssignedToMeDetails.lazy.tsx
import React, { useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import backArrow from "/asset/icons/back-arrow.svg";
import upArrow from "/asset/icons/uparrow.svg";
import downArrow from "/asset/icons/down-arrow.svg";
import DocumentDetailsCard from "../components/DocumentDetailsCard";
import { Link } from "@tanstack/react-router";
import axios from 'axios';
import axiosInst from "../services/api//axiosInst";
import Comments from "../components/Comments";
import UserName from "../components/UserName";
import SideBar from "../components/SideBar";
import SideBar2 from "../components/SideBar2";

export const Route = createLazyFileRoute("/assignedtomedetails/$workflowId/$userId")({
  component: AssignedToMeDetails
});

function AssignedToMeDetails() {
  const params = Route.useParams();
  const workflowId = params.workflowId;
  const userId = params.userId;
  const [workflowDetail, setWorkflowDetail] = useState<any>(null);
  const [buttons, setButtons] = useState<any>({});
  const [comment, setComment] = useState<string>("");
  const [approveStatus, setApproveStatus] = useState<string>("");
  const [isWorkflowInfoExpanded, setIsWorkflowInfoExpanded] = useState<boolean>(true);
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInst.get(`http://localhost:5000/initiate/workflows/${workflowId}/user/${userId}`);
        const { workflow } = data;
        console.log(data)

        // Ensure required documents have a name
        const requiredDocuments = workflow.requiredDocuments.map((doc, index) => ({
          ...doc,
          name: doc.name || `Required Document ${index + 1}`
        }));

        const updatedWorkflowDetail = {
          ...workflow,
          requiredDocuments,
        };

        setWorkflowDetail(updatedWorkflowDetail);
        setButtons(data.buttons || {});
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    if (workflowId && userId) {
      fetchData();
    }
  }, [workflowId, userId]);

  if (!workflowDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserName />
      <SideBar2 />
      <div className="mt-24 ml-80 mr-8 w-full h-full">
        <div>
          <div className="flex flex-row gap-6 font-bold items-center">
            <Link to="/assignedtome">
              <img src={backArrow} alt="Back Arrow" />
            </Link>
            <h1 className="text-teal-600 font-semibold text-2xl">
              {workflowDetail?.name}
            </h1>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col w-1/3 my-9 h-12 gap-14 border border-gray-500 border-opacity-10">
            <div className="flex flex-row justify-between py-3 px-4 cursor-pointer" onClick={() => setIsWorkflowInfoExpanded(!isWorkflowInfoExpanded)}>
              <h3 className="text-teal-600">Workflow Information</h3>
              <img src={isWorkflowInfoExpanded ? upArrow : downArrow} alt={isWorkflowInfoExpanded ? "Up Arrow" : "Down Arrow"} />
            </div>
            {isWorkflowInfoExpanded && (
              <div className="py-3 px-4 grid grid-cols-1 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-teal-600">Status:</p>
                    <p className="text-gray-600">{workflowDetail?.status}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-teal-600">Current Stage:</p>
                    <p className="text-gray-600">{workflowDetail?.currentStageIndex}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col border border-gray-500 border-opacity-10 gap-12 py-3 px-4">
              <div className="flex flex-row justify-between items-center w-full cursor-pointer" onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}>
                <h4 className="text-teal-600">Documents</h4>
                <img src={isDocumentsExpanded ? upArrow : downArrow} alt={isDocumentsExpanded ? "Up Arrow" : "Down Arrow"} />
              </div>
              {isDocumentsExpanded && workflowDetail.requiredDocuments.concat(workflowDetail.additionalDocuments).map((doc, index) => (
                <DocumentDetailsCard key={index} doc={doc} />
              ))}
            </div>
          </div>
          <div className="ml-16">
            <Comments
              workflowDetail={workflowDetail}
              setWorkflowDetail={setWorkflowDetail}
              comment={comment}
              setComment={setComment}
              approveStatus={approveStatus}
              setApproveStatus={setApproveStatus}
              buttons={buttons}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignedToMeDetails;