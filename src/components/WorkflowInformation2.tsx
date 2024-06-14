import React, { useState } from "react";
import downArrow from "/asset/icons/down-arrow.svg";
import upArrow from "/asset/icons/down-arrow.svg";
import DocumentDetailsCard1 from "./DocumentDetailsCard1";

const WorkflowInformation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Documents, setDocuments]= useState([
    {name:"Document 1",
    
    },

    {name:"Document 2",
    
   }
  ])

  return (
    <div className="flex flex-col pb-9">
      <div className={`${isOpen ? "" : "h-12"}  flex flex-col w-full  gap-9 border border-gray-500 border-opacity-10 px-6 py-3`}>
        <div className="flex flex-row justify-between ">
          <h3 className="text-teal-600 ">Workflow information</h3>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <img
              src={isOpen ? upArrow : downArrow}
              alt={isOpen ? "Up Arrow" : "Down Arrow"}
            />
          </button>
        </div>
        {isOpen ? (
          <div className="flex flex-col gap-8  ">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <h5 className="font-urbanist font-semibold text-purple-800 text-sm leading-18">
                  Owner/initiator
                </h5>
                <p className="text-xs text-gray-600">Someone's Name</p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-urbanist font-semibold text-purple-800 text-sm leading-18">
                  Owner/initiator
                </h5>
                <p className="text-xs text-gray-600">Someone's Name</p>
              </div>
            </div>

         
            

            <div>{/* Any additional content goes here */}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className={`flex flex-col gap-9 p-6 border border-gray-500 border-opacity-20 ${isOpen ? "mt-10" : "mt-9"}`}>
        <h3 className="text-lg text-teal-600  ">Documents</h3>
         {
          Documents.map((document)=>{
            return <DocumentDetailsCard1 name={document.name}/>

          })
         }
       
      </div>
    </div>
  );
};

export default WorkflowInformation;
