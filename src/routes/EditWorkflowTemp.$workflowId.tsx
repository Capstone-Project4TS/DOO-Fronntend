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
import {
  fetchCatag,
  fetchDepartment,
  fetchRequiredDocument,
  fetchRole,
  fetchSubCatag,
  fetchtCommittee,
} from "../services/api/fetchDataApi";
import { editWorkflowTemplate, getWorkflowTemplate } from "../services/api/workflowApi";

export const Route = createFileRoute("/EditWorkflowTemp/$workflowId")({
  loader: async ({ params: { workflowId } }) => {
    console.log(workflowId);

    const result = await getWorkflowTemplate(workflowId);
    console.log(result);
    const data = result.data;
    return { data, workflowId };
  },
  notFoundComponent: () => {
    return <p>step not found</p>;
  },
  component: EditWorkflowTemp,
});

// const addSection= {
//   "name":"some demo workflow",
//   "depId":"6661c53bfc6f3eba0d27b7de",
//   "categoryId":"6662896104b1482ab5876cb8",
//   "subCategoryId":"6662896904b1482ab5876cf1",
//   "additionalDoc":false,
//   "requiredDocumentTemplates":[
//      "6664db66d81f1ee5a55eb918",
//      "6664dc59d81f1ee5a55eb987"
//   ],
//   "stages":[
//      {
//         "stageTitle":"inital",
//         "hasCondition":false,
//         "ListCondition":"Select Condition",
//         "approverType":"Single Person",
//         "single_permissions":{
//            "role_id":"6661caaefc6f3eba0d27b7f9"
//         }
//      }
//   ]
// }

function EditWorkflowTemp() {
  // useEffect(() => {

  //   getDepartment();
  //   getCommittees();
  // }, []);
  const templateData: any = Route.useLoaderData();
  console.log(templateData);
  const addSection = templateData.data;
  console.log(addSection);
  let stageLength = addSection.stages.length ;
  console.log(stageLength);

  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [roles, setRoles] = useState([]);
  const [depId, setDepId] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState<any[]>([]);
  const [chosenDocuments, setChosenDocument] = useState<any[]>([]);
  const navigate = useNavigate();
  const [sectionEdited, setSectionEdited] = useState(false);
  

  function getCommittees() {
    fetchtCommittee().then(result => {
      if(!result.isError){
         console.log(result.data)
        setCommittee(result.data);
      }else{
       toast.error("error fetching");
      }

     })

  }
  function getRoles() {
    fetchRole(addSection.department._id).then((result) => {
      if (!result.isError) {
        console.log(result.data);
        setRoles(result.data);
      } else {
        console.log(result.data);
      }
    });
  }

  
  useEffect(() => {
    requriedDocument();
    if (addSection.requiredDocuments.length > 0) {
      console.log('hey')
let data: any = []
      addSection.requiredDocuments.map((item, index)=>{
         data.push(item._id)
        
      })
      setRequiredDocument(
        "workflowtemp.requiredDocumentTemplates",
        data
      );
      
    }

    getRoles();
    getCommittees()
  }, []);

  function setRequiredDocument(title: any, value: any) {
    setValue(title, value);
  }

  function setRoleValue(title: any, value: any) {
    setValue(title, value);
  }
  function requriedDocument() {
    if(addSection.subCategory != null){
      fetchRequiredDocument(addSection.subCategory._id).then((result) => {
        if (!result.isError) {
          console.log(result.data.templates, "temp");
          setRequiredDocuments(result.data.templates);
        } else {
          toast.error("error fetching");
        }
      });
    }
    
  }



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

  const onSubmit = async (data: any) => {
    console.log(data.workflowtemp, "template data");
    const result = await editWorkflowTemplate(templateData.workflowId, data.workflowtemp);
    console.log(result)
    if(!result.isError){
     toast.success(result.data.message)
     navigate({ to: `/workflowtemp` });

    }else{
      toast.error(result.data.message)
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
                  Edit Workflow Template
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
                          placeholder={addSection.name}
                          defaultValue={addSection.name}
                          disabled
                          className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="workflow.department"
                          className="text-sm w-full"
                        >
                          Choose department
                        </label>
                        <p>{addSection.department.name}</p>
                      </div>
                      {/* Document Type */}
                      <div className="flex w-full gap-3">
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">Catagory</label>
                          <p>{addSection.category != null ?  addSection.category.name: ''}</p>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">SubCatagory</label>
                          <p>{addSection.subCategory != null ?  addSection.subCategory.name: ''}</p>
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
                               
                                  setSectionEdited(true);
                              
                                setChosenDocument((prevDocuments) => {
                                  const s = [...prevDocuments, e.target.value];
                                  console.log({ s });
                                  setRequiredDocument(
                                    "workflowtemp.requiredDocumentTemplates",
                                    s
                                  );
                                  return s;
                                });
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
                              defaultChecked={addSection.additionalDoc}
                              onChange={() => {
                                setSectionEdited(true);
                              }}
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
                          {addSection.requiredDocuments.length > 0 &&
                            addSection.requiredDocuments.map(
                              (item, index) => (
                                <div key={index} className="flex gap-2">
                                  <img
                                    src="/asset/icons/order.svg"
                                    alt="Order Icon"
                                  />
                                  <p className="text-[#667085] text-sm">
                                    {item.title}
                                  </p>
                                  <div>
                                    <img
                                      onClick={() => {
                                        // Define the handleDeleteDocument function elsewhere and pass it as a prop or define it here.
                                        // handleDeleteDocument(item);
                                      }}
                                      src="/asset/icons/delete.svg"
                                      alt="Delete Icon"
                                    />
                                  </div>
                                </div>
                              )
                            )}

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
                                    // handleDeleteDocument(item);
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

                      {addSection.stages.map((item, index) => (
                        <div className="flex flex-col gap-5 mb-7">
                          <div className="flex justify-between w-full">
                            <h3
                              className="text-[#00B0AD] text-xl font-bold"
                              id="Stages"
                            >
                              Stages
                            </h3>
                            {/* <button
                            type="button"
                            onClick={() => remove(index)}
                            className="max-w-10"
                          >
                            <img src="/asset/icons/delete.svg" />
                          </button> */}
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
                                  `workflowtemp.stages.${index}.stageTitle`
                                )}
                                onChange={() => {
                                  setSectionEdited(true);
                                }}
                                defaultValue={item.title}
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
                                   
                                      setSectionEdited(true);
                                    
                                    console.log(index, e.target.checked)
                                    handleConditionChange(
                                      index,
                                      e.target.checked
                                    );
                                  }}
                                  defaultChecked={item.hasCondition}
                                />
                                <label
                                  htmlFor="hasCondition"
                                  className="text-sm w-full"
                                >
                                  Stage has conditions?
                                </label>
                              </div>

                              <div></div>
                            </div>
                          </div>
                          <div>
                       
                            {stageCondition[index] ||item.hasCondition  &&  (
                              <StageCondition
                              conditionvariants={item.conditionVariants}
                                conditionIndex={index}
                                {...{ control, register }}
                                departmentData={department}
                                committeeData={committee}
                                role={roles}
                              />
                            )}
                            
                          </div>

                          <div>
                            <label>Approver type</label>
                            <select
                              id="sectiontype"
                              {...register(
                                `document.sections.${0}.content.${index}.type`
                              )}
                              onChange={(e) => {
                                handleGroupChange(
                                 index ,
                                  e.target.value
                                );
                              
                                  setSectionEdited(true);
                              
                              }}
                              defaultValue={item.approverType}
                              className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                            >
                              <option value="Single Person">
                                Single Person
                              </option>
                              <option value="Committee">Committee</option>
                            </select>
                          </div>
                          {("singlePermissions" in item && item.singlePermissions.role !=null) ||stageGroup[index ] =="Single Person" ? (
                            <div>
                              <label>Role</label>
                           <select
                           className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                           onChange={(e: { target: { value: any } }) => {
                            
                              setSectionEdited(true);
                           
                            setRoleValue(
                              "workflowtemp.stages.${index}.singlePermission.role",
                              e.target.value
                            );
                             
                           }}
                           defaultValue={item.singlePermissions.role._id}
                         >
                          
                        <option>{item.singlePermissions.role.roleName}</option>
                           {roles?.map((option: any, index) => (
                             <option
                               className="border"
                               key={index}
                               label={option.roleName}
                               value={option._id}
                             />
                           ))}
                         </select>
                         </div>
                          ) : ("committeePermissions" in item && item.committeePermissions.committee !=null) || stageGroup[stageLength ]=="Committee"  ? (
                            <div>
                              <label>Committee</label>
                           <select
                           className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                           onChange={(e: { target: { value: any } }) => {
                            
                              setSectionEdited(true);
                         
                            setRoleValue(
                              "workflowtemp.stages.${index}.singlePermission.role",
                              e.target.value
                            );
                             
                           }}
                           defaultValue={item.committeePermissions.committee._id}
                         >
                          
                        <option>{item.committeePermissions.committee.name}</option>
                           {committee?.map((option: any, index) => (
                             <option
                               className="border"
                               key={index}
                               label={option.name}
                               value={option._id}
                             />
                           ))}
                         </select>
                         </div>
                          ):(
                             <div> 
                                <div>
                              <label>Role</label>
                           <select
                           className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                           onChange={(e: { target: { value: any } }) => {
                            
                              setSectionEdited(true);
                            
                            setRoleValue(
                              "workflowtemp.stages.${index}.singlePermission.role",
                              e.target.value
                            );
                             
                           }}
                           
                         >
                          
                        <option>No role selected</option>
                           {roles?.map((option: any, index) => (
                             <option
                               className="border"
                               key={index}
                               label={option.roleName}
                               value={option._id}
                             />
                           ))}
                         </select>
                         </div>
                             </div>
                          ) }
                        </div>
                      ))}
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
                                  onClick={() => remove( index)}
                                  className="max-w-10"
                                >
                                  <img src="/asset/icons/delete.svg" />
                                </button>
                              </div>

                              {/* stage */}
                              <h2 className="text-[#667085] text-xl">
                                Stage_{stageLength + index + 1}
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
                                      `workflowtemp.stages.${
                                        stageLength + index 
                                      }.stageTitle`,
                                      { required: true }
                                    )}
                                    onChange={() => {
                                      setSectionEdited(true);
                                    }}
                                    className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                                    required
                                  />
                                </div>
                                <div className="flex gap-5 w-full">
                                  <div className="flex gap-4 justify-center items-center ">
                                    <input
                                      type="checkbox"
                                      {...register(
                                        `workflowtemp.stages.${
                                          stageLength + index 
                                        }.hasCondition`
                                      )}
                                      onChange={(e) => {
                                       
                                          setSectionEdited(true);
                                       
                                        handleConditionChange(
                                          stageLength + index ,
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
                                        `workflowtemp.stages.${
                                          stageLength + index 
                                        }.ListCondition`
                                      )}
                                      onChange={() => {
                                        setSectionEdited(true);
                                      }}
                                      className="text-[#667085] w-full text-sm border border-[#EFEFF4] rounded-lg p-3 "
                                    >
                                      <option>Select Condition</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {stageCondition[stageLength + index ] && (
                              <StageCondition
                                conditionIndex={stageLength + index }
                                {...{ control, register }}
                                departmentData={department}
                                committeeData={committee}
                                role={roles}
                              />
                            )}
                            {!stageCondition[stageLength + index ] && (
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
                                            `workflowtemp.stages.${
                                              stageLength + index 
                                            }.approverType`
                                          )}
                                          value="Single Person"
                                          onChange={(e) => {
                                            handleGroupChange(
                                              stageLength + index ,
                                              e.target.value
                                            );
                                           
                                              setSectionEdited(true);
                                           
                                          }}
                                          defaultChecked
                                        />
                                        <label>Single Person</label>
                                      </div>
                                      <div className="flex gap-2">
                                        <input
                                          type="radio"
                                          {...register(
                                            `workflowtemp.stages.${
                                              stageLength + index 
                                            }.approverType`
                                          )}
                                          value="Committee"
                                          onChange={(e) => {
                                            handleGroupChange(
                                              stageLength + index ,
                                              e.target.value
                                            );
                                           
                                              setSectionEdited(true);
                                            
                                          }}
                                        />
                                        <label>Committee</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {stageGroup[stageLength + index ] ==
                                "Committee" ? (
                                  <div className="w-full flex flex-col gap-2">
                                    <div className="w-full flex flex-col gap-2">
                                      <label className="text-sm w-full">
                                        Select Committee*
                                      </label>
                                      <select
                                        {...register(
                                          `workflowtemp.stages.${
                                            stageLength + index + 1
                                          }.committee_permissions.role_ids`
                                        )}
                                        onChange={() => {
                                          setSectionEdited(true);
                                        }}
                                        className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                                      >
                                        <option>Select Committee</option>
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
                                          Select Role
                                        </label>
                                        <select
                                          {...register(
                                            `workflowtemp.stages.${
                                              stageLength + index 
                                            }.single_permissions.role._id`
                                          )}
                                          onChange={() => {
                                            setSectionEdited(true);
                                          }}
                                          className="text-[#667085] bg-white w-full text-sm border border-[#EFEFF4] rounded-lg p-3"
                                        >
                                          <option>Select Role</option>
                                          {roles.map((option: any, index) => (
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
                          onClick={() =>{
                            append({
                              stageTitle: "",
                              hasCondition: "",
                              approverType: "",
                              group: "",
                              department: "",
                              role: "",
                              permissionType: "",
                            })
                            setSectionEdited(true);

                          }
                          }
                          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                        >
                          Add stage
                        </button>{" "}
                        {/* section 4*/}
                      </div>
                      {sectionEdited && (
                         <button
                         type="submit"
                         className=" w-full text-base px-6 py-2 text-[#00B0AD] bgt-white rounded-lg border border-[#00B0AD] flex items-center justify-center gap-3"
                       >
                       Edit workflow
                       </button>
                      )}
                     
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

export default EditWorkflowTemp;
