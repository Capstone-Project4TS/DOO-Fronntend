import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "react-dropdown";
import {
  useFieldArray,
  useForm,
  FormProvider,
  FieldArrayMethodProps,
} from "react-hook-form";
import "react-dropdown/style.css";
import StageCondition from "../components/stageCondition";
import axios from "axios";
import { fetchCatag, fetchDepartment, fetchRequiredDocument, fetchRole, fetchSubCatag, fetchtCommittee } from "../services/api/fetchDataApi";


export const Route = createFileRoute("/workflowadd")({
  component: () => <WorkFlowAddTemp />,
});

function WorkFlowAddTemp() {
  useEffect(() => {
    
    getDepartment();
    getCommittees();
  }, []);


  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [role, setRoles] = useState([]);
  const [depId, setDepId] = useState('')
  const [subCategory, setSubCategory] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState<any[]>([]);
  const [chosenDocuments, setChosenDocument] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      console.log(depId)
    getCategory();
    getRoles();
  }, [depId]);
  
  function getDepartment(){
    fetchDepartment().then(result => {
      if(!result.isError){
        setDepartment(result.data)
      }else{
       toast.error("error fetching");
      }
      
     })
 
  }


  function getCommittees() {
    fetchtCommittee().then(result => {
      if(!result.isError){
    
        setCommittee(result.data);
      }else{
       toast.error("error fetching");
      }
      
     })
    
  }
  function getRoles() {
    fetchRole(depId).then(result => {
      if(!result.isError){
        console.log(result.data)
        setRoles(result.data);
      }else{
       console.log(result.data)
      }
      
     })
    
  }

  function getSubCategory(value: any) {
    fetchSubCatag(value).then(result => {
     if(!result.isError){
      setSubCategory(result.data);
     }else{
      toast.error("error fetching");
     }
     
    })

   
  
  }

  function setRequiredDocument(title: any, value: any) {
    setValue(title, value);
  }
  function requriedDocument(subCategoryId: any) {
    fetchRequiredDocument(subCategoryId).then(result => {
      if(!result.isError){
        console.log(result.data.templates, 'docs')
        setRequiredDocuments(result.data.templates)
      }else{
       toast.error("error fetching");
      }
      
     })
 
  }
  

  function getCategory() {
    fetchCatag(depId).then(result => {
      if(!result.isError){
       setCategory(result.data);
      }else{
        console.log(result)
       
      }
    })
    
  }
  const handleDeleteDocument = (title: any) => {
    setChosenDocument((prevDocuments) =>
      prevDocuments.filter((doc) => doc.title !== title)
    );
  };

  const [stageCondition, setStageCondition] = useState([]);
  const [stageGroup, setStageGroup] = useState([]);
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  const { control, reset } = methods;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      stageTitle: "",
      hasCondition: "",
      allowAdditional: "",
      // documents:[],
      listCondition: "",
      approverType: "",
      department: "",
      Committee: "",
      role: "",
      permissionType: "",
      conditionvariants: [
        {
          operator: "",
          value: "",
          approverType: "",
          department: "",
          role: "",
          permissionType: "",
          Committee: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workflowtemp",
  });

  const handleConditionChange = (index: any, newCondition: any) => {
    const newConditions: any = [...stageCondition];
    newConditions[index] = newCondition;
    setStageCondition(newConditions);
  };

  const handleGroupChange = (index: any, newCondition: any) => {
    const newConditions: any = [...stageGroup];
    newConditions[index] = newCondition;
    setStageGroup(newConditions);
  };

  const onSubmit = (data: any) => {
    console.log(data.workflowtemp, "template data");

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/admin/workflow-templates",
      withCredentials: true,
      headers: {},
      data: data.workflowtemp,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Successfully workflow Template Created!");
      
                  navigate({ to: "/workflowtemp" });
      })
      .catch(function (error) {
        console.log(error);
        
        toast.error("please try again");
      });

    const dataSent={

    }
  };

  

  return (
    <FormProvider {...methods}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-3 mb-10 ">
        <div className="flex">
          <SideBar />
          <div className="w-full flex flex-col">
            <NavBar />
            <div className="mt-10">
              <div className="header flex items-center gap-3 ">
                <a href="/workflowtemp">
                  <img src="/asset/icons/back-arrow.svg" />
                </a>
                <h2 className="text-[#4A176D] text-3xl font-bold">
                  Add New Workflow Template
                </h2>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 w-full"
              >
                <div className="flex mt-10 gap-5">
                  <div className="mb-6 rounded-lg overflow-hidden flex flex-col gap-10 w-full">
                    {/* section1 */}
                    <div className="flex flex-col gap-5 p-6 border border-[#EFEFF4] rounded-lg">
                      <h3
                        className="text-[#00B0AD] text-1xl font-bold"
                        id=" Workflow Information"
                      >
                        Workflow Information
                      </h3>
                      {/* Document Name */}
                      <div className="mt-4">
                        <label
                          htmlFor="workflowName"
                          className="text-sm w-full"
                        >
                          Workflow Name*
                        </label>
                        <input
                          type="text"
                          id="WorkflowName"
                          {...register("workflowtemp.name", {
                            required: true,
                          })}
                          className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="workflow.department"
                          className="text-sm w-full"
                        >
                          Choose department*
                        </label>
                        <select
                            
                            className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                            {...register("workflowtemp.depId", {
                              required: true,
                            })}
                            onChange={(e: { target: { value: any } }) =>
                              setDepId(e.target.value)
                            }
                            required
                          >
                            <option label="Select" value="" />
                            {department?.map((option: any, index) => (
                              <option
                                key={option}
                                label={option.name}
                                value={option._id}
                              />
                            ))}
                          </select>
                      </div>
                      {/* Document Type */}
                      <div className="flex w-full gap-3">
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">
                            Workflow Category*
                          </label>
                          <select
                            className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                            {...register("workflowtemp.categoryId", {
                              required: true,
                            })}
                            onChange={(e: { target: { value: any } }) =>
                              getSubCategory(e.target.value)
                            }
                          >
                            <option value="">Select Category</option>
                            {category?.map((option: any, index) => (
                              <option
                                key={index}
                                label={option.name}
                                value={option._id}
                              />
                            ))}
                          </select>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">
                            Workflow Subcategory*
                          </label>
                          <select
                            className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                            {...register("workflowtemp.subCategoryId", {
                              required: true,
                            })}
                            onChange={(e: { target: { value: any } }) =>
                              requriedDocument(e.target.value)
                            }
                          >
                            <option value="">Select SubCategory</option>

                            {subCategory?.map((option: any, index) => (
                              <option
                                key={index}
                                label={option.name}
                                value={option._id}
                              />
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* section 2 */}
                    <div>
                      <div className="flex flex-col gap-5 p-6 border border-[#EFEFF4] rounded-lg">
                        <h3
                          className="text-[#00B0AD] text-1xl font-bold"
                          id="Required Documents"
                        >
                          Required Documents
                        </h3>
                        {/* Document Name */}
                        <div className="flex flex-row gap-10 w-full items-center justify-center">
                          <div className="flex flex-col gap-4 w-full">
                            <label
                              htmlFor="documentName"
                              className="text-sm w-full"
                            >
                              Document Templates
                            </label>

                            <select
                              className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                              onChange={(e: { target: { value: any } }) => {
                                // setChosenDocument((prevDocuments) =>
                                //   [...prevDocuments, e.target.value];

                                // setRequiredDocument(
                                //   "workflowtemp.requiredDocumentTemplates",
                                //   chosenDocuments
                                // );
                                // );
                                // console.log({ chosenDocuments });
                                setChosenDocument((prevDocuments) => {
                                  const s = [...prevDocuments, e.target.value];
                                  console.log({ s });
                                  setRequiredDocument(
                                    "workflowtemp.requiredDocumentTemplates",
                                    s
                                  );
                                  return s;
                                });

                                // setRequiredDocument(
                                //   "workflowtemp.requiredDocumentTemplates",
                                //   chosenDocuments
                                // );
                              }}
                            >
                              <option>select a document</option>
                              {requiredDocuments?.map((option: any, index) => (
                                <option
                                  className="border"
                                  key={index}
                                  label={option.documentTitle}
                                  value={option._id}
                                />
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-4 justify-center items-center w-full">
                            <input
                              type="checkbox"
                              {...register("workflowtemp.additionalDoc")}
                            />
                            <label
                              htmlFor="additionalInfo"
                              className="text-sm w-full"
                            >
                              Allow Additional Information
                            </label>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor="documentName"
                            className="text-sm w-full"
                          >
                            Order of appearance
                          </label>
                          {/* <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <SortableContext
                              items={chosenDocuments}
                              strategy={verticalListSortingStrategy}
                            >
                              {chosenDocuments.map((item, index) => (
                                <SortableItem
                                  key={index}
                                  title={item}
                                  id={index + 1}
                                />
                              ))} */}

                          {/* {items.map(id => <SortableItem key={id} id={id} />)} */}
                           {chosenDocuments.map((item, index) => (
                            <div className="flex gap-2">
                              <img src="/asset/icons/order.svg" />
                              <p className="text-[#667085] text-sm">
                                {
                                  requiredDocuments.find((i) => i._id === item)
                                    .documentTitle
                                }
                              </p>
                              <div>
                                <img
                                  onClick={() => {
                                    handleDeleteDocument(item);
                                  }}
                                  src="/asset/icons/delete.svg"
                                />
                              </div>
                            </div>
                          ))} 
                          {/* </SortableContext>
                          </DndContext> */}
                        </div>
                      </div>
                    </div>

                    {/* section 3 */}
                    <div className="condition-stages flex flex-col gap-7  border border-[#EFEFF4] rounded-lg  p-6">
                      <div className="flex flex-col gap-7">
                        {fields.map((field, index) => (
                          <div key={index}>
                            <div className="flex flex-col gap-5 mb-7">
                              <div className="flex justify-between w-full">
                                <h3
                                  className="text-[#00B0AD] text-xl font-bold"
                                  id="Stages"
                                >
                                  Stages
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="max-w-10"
                                >
                                  <img src="/asset/icons/delete.svg" />
                                </button>
                              </div>

                              {/* stage */}
                              <h2 className="text-[#667085] text-xl">
                                Stage_{index + 1}
                              </h2>
                              <div className="flex flex-col gap-5 w-full items-center justify-center">
                                <div className="flex flex-col gap-4 w-full">
                                  <label
                                    htmlFor="stageTitle"
                                    className="text-sm w-full"
                                  >
                                    Stage Title*
                                  </label>
                                  <input
                                    type="text"
                                    id="stagetitle"
                                    {...register(
                                      `workflowtemp.stages.${index}.stageTitle`,
                                      { required: true }
                                    )}
                                    className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                                    required
                                  />
                                </div>
                                <div className="flex gap-5 w-full">
                                  <div className="flex gap-4 justify-center items-center ">
                                    <input
                                      type="checkbox"
                                      {...register(
                                        `workflowtemp.stages.${index}.hasCondition`
                                      )}
                                      onChange={(e) => {
                                        handleConditionChange(
                                          index,
                                          e.target.checked
                                        );
                                      }}
                                    />
                                    <label
                                      htmlFor="hasCondition"
                                      className="text-sm w-full"
                                    >
                                      Stage has conditions?
                                    </label>
                                  </div>
                                  <div>
                                    <select
                                      {...register(
                                        `workflowtemp.stages.${index}.ListCondition`
                                      )}
                                      className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                                    >
                                      <option>Select Condition</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {stageCondition[index] && (
                              <StageCondition
                                conditionIndex={index}
                                {...{ control, register }}
                                departmentData={department}
                                committeeData={committee}
                                role={role}
                              />
                            )}
                            {!stageCondition[index] && (
                              <div
                                key={field.id}
                                className="flex flex-col gap-5 w-full items-center justify-center mb-6"
                              >
                                {/* Document Name */}

                                <div className="flex gap-5 w-full">
                                  <div className="flex gap-4 justify-center items-center">
                                    <div
                                      role="approverType"
                                      aria-labelledby="my-radio-approverType "
                                      className="w-full flex gap-10 "
                                    >
                                      <div className="flex gap-2">
                                        <input
                                          type="radio"
                                          {...register(
                                            `workflowtemp.stages.${index}.approverType`
                                          )}
                                          value="Single Person"
                                          onChange={(e) => {
                                            handleGroupChange(
                                              index,
                                              e.target.value
                                            );
                                          }}
                                         
                                        />
                                        <label>Single Person</label>
                                      </div>
                                      <div className="flex gap-2">
                                        <input
                                          type="radio"
                                          {...register(
                                            `workflowtemp.stages.${index}.approverType`
                                          )}
                                          value="Committee"
                                          onChange={(e) => {
                                            handleGroupChange(
                                              index,
                                              e.target.value
                                            );
                                          }}
                                        />
                                        <label>Committee</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {stageGroup[index] == "Committee" ? (
                                  <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-col gap-2">
                                      <label className="text-sm w-full">
                                        Select Committee*
                                      </label>
                                      <select
                                        // {...register(
                                        //   `workflowtemp.stages.${index}.committee_permissions.role_ids`
                                        // )}
                                        onChange={(e)=>{
                                          setValue(`workflowtemp.stages.${index}.committee_permissions.role_ids`, e.target.value)
                                        }}
                                        className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                                        defaultValue={''}
                                      >
                                        <option>select committe</option>
                                        {committee.map((option: any, index) => (
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
                                        <label className="text-sm w-full">
                                          Select Role*
                                        </label>
                                        <select
                                          // {...register(
                                          //   `workflowtemp.stages.${index}.single_permissions.role_id`
                                          // )}
                                          className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                                          defaultValue={''}
                                          onChange={(e)=>{
                                            setValue(`workflowtemp.stages.${index}.single_permissions.role_id`,e.target.value)
                                          }}
                                        >
                                          <option>select role</option>
                                          {role.map((option: any, index) => (
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
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            append({
                              stageTitle: "",
                              hasCondition: "",
                              approverType: "",
                              group: "",
                              department: "",
                              role: "",
                              permissionType: "",
                            })
                          }
                          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                        >
                          Add stage
                        </button>{" "}
                        {/* section 4*/}
                      </div>
                      <button
                        type="submit"
                        className=" w-full text-base px-6 py-2 text-[#00B0AD] bgt-white rounded-lg border border-[#00B0AD] flex items-center justify-center gap-3"
                      >
                        <img src="/asset/icons/plus-black.svg" /> Submit
                      </button>
                    </div>
                  </div>
                  <div className="quick-acess flex flex-col p-4 border border-[#EFEFF4] w-[25%] gap-2 rounded-lg">
                    <p className="text-sm font-bold p-2">Quick Access</p>
                    <a
                      href="#Workflow Information"
                      className="text-sm bg-[#E0F1F3] rounded-lg p-2 text-[#00B0AD]"
                    >
                      Workflow Information
                    </a>
                    <a href="#Required Documents" className="text-sm  p-2">
                      Required Documents
                    </a>
                    <a href="#Stages" className="text-sm  p-2">
                      Stages
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default WorkFlowAddTemp;
