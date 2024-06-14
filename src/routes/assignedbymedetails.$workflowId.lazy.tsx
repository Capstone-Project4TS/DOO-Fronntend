import { createLazyFileRoute } from "@tanstack/react-router";
import backArrow from "/asset/icons/back-arrow.svg";
import UserName from "../components/UserName";
import SideBar2 from "../components/SideBar2";
import Comm from "../components/Comm";

import { useState, useEffect, useRef } from "react";

import downArrow from "/asset/icons/downArrow.svg";
import upArrow from "../../public/asset/icons/uparrow.svg";
import DocumentDetailsCard1 from "../components/DocumentDetailsCard1";
import { workflowDetail } from "../services/api/ownerWorkApi";
import Actions from "../components/Actions";

interface Document {
  name: string;
  filePath: string;
}

interface Workflow {
  _id: string;
  status: string;
  name: string;
  currentStageIndex: number;
  requiredDocuments: Document[];
  additionalDocuments: Document[];
  comments: Comment[];
}

interface Comment {
  stageIndex: number;
  fromUser: { _id: string };
  toUser: { _id: string };
  comment: string;
  visibleTo: { _id: string }[];
  _id: string;
  createdAt: string;
}

interface Buttons {
  canMoveForward: boolean;
  canMoveBackward: boolean;
  isOwner: boolean;
  canApprove: boolean;
}

interface WorkflowDetailData {
  workflow: Workflow;
  buttons: Buttons;
}

export const Route = createLazyFileRoute("/assignedbymedetails/$workflowId")({
  component: () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const underlineRef = useRef<HTMLDivElement>(null);
    const params = Route.useParams();
    const workflowId = params.workflowId;

    const [isOpen, setIsOpen] = useState(false);
    const user: any = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const userId = userData._id;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [workflowDetailData, setWorkflowDetailData] =
      useState<WorkflowDetailData>({
        workflow: {
          _id: "",
          status: "",
          currentStageIndex: 0,
          requiredDocuments: [],
          additionalDocuments: [],
          comments: [],
        },
        buttons: {
          canMoveForward: false,
          canMoveBackward: false,
          isOwner: false,
          canApprove: false,
        },
      });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await workflowDetail(workflowId, userId);
          setWorkflowDetailData(result.data);
          setIsLoading(false);
          setIsError(false);
        } catch (error) {
          console.error("Error fetching workflow details:", error);
          setIsLoading(false);
          setIsError(true);
        }
      };

      fetchData();
    }, [workflowId, userId]);

    useEffect(() => {
      const activeTabElement = document.getElementById(`tab-${activeTab}`);
      if (underlineRef.current && activeTabElement) {
        underlineRef.current.style.width = `${activeTabElement.offsetWidth}px`;
        underlineRef.current.style.left = `${activeTabElement.offsetLeft}px`;
      }
    }, [activeTab]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen bg-green-100">
          <div className="rounded-full h-20 w-20 bg-teal-400 animate-ping"></div>
        </div>
      );
    }

    if (isError) {
      return <div>Error loading data. Please try again later.</div>;
    }

    const comments = workflowDetailData.workflow.comments;

    const Documents = workflowDetailData.workflow.requiredDocuments;
    const Documents2 = workflowDetailData.workflow.additionalDocuments;
    const detail = workflowDetailData.workflow;

    
 console.log(detail)

    return (
      <div>
        <UserName />
        <SideBar2 />
        <div className="mt-24 ml-80 mr-8 w-full h-full">
          <div className="flex gap-9">
            <div className="w-6/12">
              <div className="">
                <div className="flex flex-row gap-6 font-bold items-center">
                  <a href="/assignedbyme" className="items-center">
                    <img src={backArrow} alt="Back" />
                  </a>
                  <h1 className="text-teal-600 font-semibold text-2xl">
                    {detail.name}
                  </h1>
                </div>
              </div>
              <div className="flex relative mt-9">
                <div
                  id="tab-1"
                  className={`cursor-pointer py-2 px-4 ${
                    activeTab === 1 ? "text-purple-900" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Details
                </div>

                <div
                  id="tab-3"
                  className={`cursor-pointer py-2 px-4 ${
                    activeTab === 3 ? "text-purple-900" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(3)}
                >
                  Comments({comments.length})
                </div>
                <div
                  ref={underlineRef}
                  className="absolute bottom-0 h-0.5 bg-purple-900 transition-all duration-300 rounded-md"
                  style={{ width: 0, left: 0 }}
                />
              </div>
              <div className="flex flex-col gap-9 w-full mt-7">
                {activeTab === 1 && (
                  <div className="flex flex-col pb-9">
                    <div
                      className={`${
                        isOpen ? "" : "h-12"
                      } flex flex-col w-full gap-9 border border-gray-500 border-opacity-10 px-6 py-3`}
                    >
                      <div className="flex flex-row justify-between">
                        <h3 className="text-teal-600">Workflow information</h3>
                        <button onClick={() => setIsOpen((prev) => !prev)}>
                          <img
                            src={isOpen ? upArrow : downArrow}
                            alt={isOpen ? "Up Arrow" : "Down Arrow"}
                          />
                        </button>
                      </div>
                      {isOpen && (
                        <div className="flex flex-col gap-8">
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                              <h5 className="font-urbanist font-semibold text-purple-800 text-sm leading-18">
                                Owner/initiator
                              </h5>
                              <p className="text-xs text-gray-600">
                                {userData.username}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <h5 className="font-urbanist font-semibold text-purple-800 text-sm leading-18">
                                Status
                              </h5>
                              <p className="text-xs text-gray-600">
                                {detail.status}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                              <h5 className="font-urbanist font-semibold text-purple-800 text-sm leading-18">
                                Current Stage
                              </h5>
                              <p className="text-xs text-gray-600">
                                {detail.currentStageIndex + 1}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex flex-col gap-9 p-6 border border-gray-500 border-opacity-20 ${
                        isOpen ? "mt-10" : "mt-9"
                      }`}
                    >
                      <h3 className="text-lg text-teal-600">Documents</h3>
                      {Documents.map((document, index) => (
                        <DocumentDetailsCard1
                          key={index}
                          name={document.name}
                          link={document.filePath}
                        />
                      ))}

                      {Documents2.map((document, index) => (
                        <DocumentDetailsCard1
                          key={index}
                          name={document.name}
                          link={document.filePath}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="flex flex-col border p-6">
                    <div className="text-lg text-teal-600 mb-8">Comments</div>
                    <div className="flex flex-col gap-4">
                      {comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <Comm
                            key={index}
                            name={comment.fromUser._id}
                            time={comment.createdAt}
                            details={comment.comment}
                          />
                        ))
                      ) : (
                        <p>No comments available</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-24">
              <Actions 
              workflowId={workflowId}
              detail= {detail}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});