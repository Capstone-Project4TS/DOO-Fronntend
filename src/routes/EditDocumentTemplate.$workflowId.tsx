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
import { getDocumentTemplate, updateDocumentTemplate } from "../services/api/documentApi";

export const Route = createFileRoute("/EditDocumentTemplate/$workflowId")({
  loader: async ({ params: { workflowId } }) => {
   console.log(workflowId) 
   
    const result = await getDocumentTemplate(workflowId);

    const data = result.data;
    return { data,workflowId };
  },
  notFoundComponent: () => {
    return <p>step not found</p>;
  },
  component: EditDocumentTemplate,
});

// const addSection = {
//   title: "trial document template",
//   subCategoryId: "6662896904b1482ab5876cf1",
//   sections: [
//     {
//       title: "loan information",
//       content: [
//         {
//           title: "loan name",
//           type: "text",
//           isRequired: "true",
//           conditionLogic: true,
//         },
//         {
//           title: "loan type",
//           type: "select",
//           options: ["eduaction ", "business"],
//           isRequired: "false",
//         },
//       ],
//     },
//   ],
//   depId: "6661c53bfc6f3eba0d27b7de",
//   categoryId: "6662896104b1482ab5876cb8",
// };

function EditDocumentTemplate() {
  const navigate = useNavigate();
  const [sectionEdited, setSectionEdited] = useState(false);
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  const templateData: any = Route.useLoaderData();
  console.log(templateData);
  const addSection = templateData.data;
  console.log(addSection);
  let sectionLength = addSection.sections[0].content.length;
  console.log(sectionLength);

  const { control, reset } = methods;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: "",
      type: "",
      required: "",
      condition: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "document",
  });

  const onSubmit = async (data: any) => {
    console.log(data.document, "docment data");
    const documentData=data.document;
    const result = await updateDocumentTemplate(templateData.workflowId, documentData);
    console.log(result)
    if(!result.isError){
     toast.success(result.data.message)
     navigate({ to: `/documentemp` });

    }else{
      toast.error(result.data.message)
    }
    
    // const documentTempData= 

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
                  Edit Document Template
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
                        Document Information
                      </h3>
                      {/* Document Name */}
                      <div className="mt-4">
                        <label
                          htmlFor="workflowName"
                          className="text-sm w-full"
                        >
                          Document Name*
                        </label>
                        <input
                          type="text"
                          id="documentName"
                          // {...register("document.name", {})}
                          placeholder={addSection.title}
                          className="border rounded-md p-2 mt-1 w-full"
                          defaultValue={addSection.title}
                          disabled // Set width to full and remove fixed width
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="workflow.department"
                          className="text-sm w-full"
                        >
                          department
                        </label>
                        <p>{addSection.department}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">Catagory</label>
                          <p>{addSection.category}</p>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">SubCatagory</label>
                          <p>{addSection.subCategory}</p>
                        </div>
                      </div>
                    </div>

                    {/* section 2 */}
                    <div>
                      <div className="my-4 p-2">
                        <label
                          htmlFor="documentName"
                          className="text-[#00B0AD] text-xl font-bold "
                        >
                          Field Title*
                        </label>
                        <input
                          type="text"
                          id="documentName"
                          {...register(`document.sections.${0}.title`)}
                          placeholder={addSection.sections[0].title}
                          className="border rounded-md p-2 mt-1 w-full"
                          defaultValue={addSection.sections[0].title}
                          onChange={() => {
                            setSectionEdited(true);
                          }}
                        />
                      </div>
                      {addSection.sections[0].content.map(
                        (item: any, index: any) => (
                          <div className="flex flex-col gap-4 p-2">
                            <h3 className="text-[#00B0AD] text-lg font-bold my-3">
                              {" "}
                              Section {index + 1}
                            </h3>
                            <div className="flex flex-col gap-4 w-full">
                              <label
                                htmlFor="sectionTitle"
                                className="text-sm w-full"
                              >
                                title
                              </label>
                              <input
                                type="text"
                                id="sectiontitle"
                                {...register(`document.sections.${0}.content.${index}.title`)}
                                placeholder={
                                  addSection.sections[0].content[index].title
                                }
                                defaultValue={
                                  addSection.sections[0].content[index].title
                                }
                                className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                                onChange={() => {
                                  setSectionEdited(true);
                                }}
                              />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                              <label
                                htmlFor="stageTitle"
                                className="text-sm w-full"
                              >
                                type
                              </label>
                              <select
                                id="sectiontype"
                                {...register(`document.sections.${0}.content.${index}.type`)}
                                defaultValue={
                                  addSection.sections[0].content[index].type
                                }
                                className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                                onChange={() => {
                                  setSectionEdited(true);
                                }}
                              >
                                <option value="text">text</option>
                                <option value="textarea">textarea</option>
                                <option value="select">select</option>
                                <option value="upload">upload</option>
                                <option value="date">date</option>
                                <option value="number">number</option>
                              </select>
                            </div>
                            <div className="flex gap-4 w-full">
                              <label htmlFor="sectionTitle" className="text-sm">
                                is it Required
                              </label>
                              <input
                                type="checkbox"
                                id="required"
                                {...register(
                                  `document.sections.${0}.content.${index}.isRequired`
                                )}
                                defaultChecked={addSection.sections[0].content[index].isRequired}

                                onChange={(data) => {
                                 
                                  setSectionEdited(true);
                                }}
                              />
                            </div>
                            <div className="flex gap-3 w-full">
                              <label htmlFor="sectionTitle">condition</label>
                              <input
                                type="checkbox"
                                id="condition"
                                {...register(
                                  `document.sections.${0}.content.${index}.conditionLogic`
                                )}
                                defaultChecked={addSection.sections[0].content[index].conditionLogic}
                                onChange={() => {
                                  setSectionEdited(true);
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}

                      {fields.map((field, index) => (
                        <div className="flex flex-col gap-4">
                          <div className="w-full flex justify-between">
                            <h3 className="text-[#00B0AD] text-lg font-bold my-3">
                              {" "}
                              New Section {sectionLength + index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="max-w-20"
                            >
                              <img
                                className="w-7 h-7"
                                src="/asset/icons/delete.svg"
                              />
                            </button>
                          </div>

                          <div className="flex flex-col gap-4 w-full">
                            <label
                              htmlFor="sectionTitle"
                              className="text-sm w-full"
                            >
                              title
                            </label>
                            <input
                              type="text"
                              id="sectiontitle"
                              {...register(
                                `document.sections.${0}.content.${
                                  sectionLength + index
                                }.title`
                              )}
                              className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                              onChange={() => {
                                setSectionEdited(true);
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-4 w-full">
                            <label
                              htmlFor="stageTitle"
                              className="text-sm w-full"
                            >
                              type
                            </label>
                            <select
                              id="sectiontype"
                              {...register(
                                `document.sections.${0}.content.${sectionLength + index}.type`
                              )}
                              className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                              onChange={() => {
                                setSectionEdited(true);
                              }}
                            >
                              <option value="text">text</option>
                              <option value="textarea">textarea</option>
                              <option value="select">select</option>
                              <option value="upload">upload</option>
                              <option value="date">date</option>
                              <option value="number">number</option>
                            </select>
                          </div>
                          <div className="flex gap-4 ">
                            <label htmlFor="sectionTitle" className="text-sm ">
                              is it Required
                            </label>
                            <input
                                type="checkbox"
                                id="required"
                                {...register(
                                  `document.sections.${0}.content.${sectionLength + index}.isRequired`
                                )}
                                // defaultChecked={addSection.sections[0].content[index].isRequired}

                                onChange={() => {
                                 
                                  setSectionEdited(true);
                                }}
                              />
                          </div>
                          <div className="flex gap-3 w-full">
                            <label htmlFor="sectionTitle">condition</label>
                            <input
                              type="checkbox"
                              
                              {...register(
                                `document.sections.${0}.content.${
                                  sectionLength + index
                                }.conditionLogic`
                              )}
                              onChange={() => {
                                setSectionEdited(true);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append({})}
                        className="w-full text-base px-6 py-2 mt-4 text-[#4A176D]  rounded-lg flex items-center justify-center gap-3mt-4 p-2 border  border-[#4A176D]"
                      >
                        <img src="/asset/icons/plus-black.svg" /> Add section
                      </button>
                    </div>
                    {sectionEdited && (
                      <button
                        type="submit"
                        className=" w-full text-base px-6 py-2 text-[#00B0AD] bgt-white rounded-lg border border-[#00B0AD] flex items-center justify-center gap-3"
                      >
                        Edit Section
                      </button>
                    )}
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

export default EditDocumentTemplate;
