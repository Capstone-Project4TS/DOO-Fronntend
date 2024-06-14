import axios from "axios";
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";

export default ({
  conditionIndex,
  control,
  register,
  departmentData,
  committeeData,
  role
}: any) => {
  
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workflowtemp.${conditionIndex}.conditionvariants`,
  });
  const [stageGroup, setStageGroup] = useState([]);
  const handleGroupChange = (index: any, newCondition: any) => {
    const newConditions: any = [...stageGroup];
    newConditions[index] = newCondition;
    setStageGroup(newConditions);
  };
  function setValue(arg0: string, value: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-5 w-full items-center justify-center mb-6"
        >
          {/* Document Name */}
          <div className="flex justify-between w-full">
            <h2 className="text-[#667085] text-xl">Condition_{index + 1}</h2>
            <button
              type="button"
              onClick={() => remove(index)}
              className="max-w-10"
            >
              <img src="/asset/icons/delete.svg" />
            </button>
          </div>

          <div className="flex flex-row items-start justify-center w-full border border-[#EFEFF4] rounded-lg">
            <select
              className="w-[10%] text-sm bg-white border-r-2 border-[#D0D5DD] p-3"
              {...register(
                `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.operator`
              )}
            >
              <option className="text-[#667085]">{`>`}</option>
              <option className="text-[#667085]">{`<`}</option>
            </select>
            <input
              type="text"
              {...register(
                `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.value`,
                {
                  required: true,
                }
              )}
              className="p-2 mt-1 w-full"
              required
            />
          </div>
          <div className="flex gap-5 w-full">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register(
                    `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.approverType`
                  )}
                  value="single"
                  onChange={(e) => {
                    handleGroupChange(index, e.target.value);
                  }}
                  defaultChecked
                />
                <label>Single Person</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register(
                    `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.approverType`
                  )}
                  value="committee"
                  onChange={(e) => {
                    handleGroupChange(index, e.target.value);
                  }}
                />
                <label>Committee</label>
              </div>
            </div>
          </div>

          {stageGroup[index] == "committee" ? (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm w-full">Select Committee*</label>
                <select
                  // {...register(
                  //   `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.committee_permissions.role_ids`
                  // )}
                  className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                  onChange={(e)=>{
                    setValue(`workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.committee_permissions.role_ids`, e.target.value)
                  }}
                  defaultValue={''}
                >
                  <option>Select Committee</option>
                  {committeeData.map((option: any, index: any) => (
                    <option
                      key={index}
                      label={option.name}
                      value={option._id}
                    />
                  ))}
                </select>
              </div>

              
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2">
             
              <div className="w-full flex gap-6">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm w-full">Select Role**</label>
                  <select
                    // {...register(
                    //   `workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.single_permissions.role_id`
                    // )}
                    className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                    onChange={(e)=>{
                      setValue(`workflowtemp.stages.${conditionIndex}.conditionvariants.${index}.single_permissions.role_id`, e.target.value)
                    }}
                    defaultValue={''}
                  >
                    <option>Select Role</option>
                    {role.map((option: any, index:any) => (
                      <option
                        key={index}
                        label={option.roleName}
                        value={option._id}
                      />
                    ))}
                  </select>
                </div>
                
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            operator: "",
            value: "",
            approverType: "single",
            department: "",
            role: "",
            permissionType: "",
          })
        }
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Add Condition
      </button>{" "}
    </div>
  );
};
