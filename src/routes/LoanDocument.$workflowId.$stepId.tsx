import "quill/dist/quill.snow.css";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import NavBar from "../components/NavBar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import toast, { Toaster } from "react-hot-toast";
import { FormBuilder } from "../components/FormBuilder";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useStepFormStore,{ useNameStore } from "../store/formStore";
import SideBar2 from "../components/SideBar2";
import toast, { Toaster } from "react-hot-toast";
// import toast, { Toaster } from "react-hot-toast";

export const Route = createFileRoute("/LoanDocument/$workflowId/$stepId")({
  loader: async ({ params: { workflowId, stepId } }) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/admin/workflow-templates/requiredDoc/${workflowId}`,
      withCredentials: true,
      headers: {},
    };

    const res = await axios(config);
    console.log(res);
    const data = await res.data;

    const addField = {
      _id: "",
      title: "Additional Data",
      sections: [
        {
          multiple: false,
          title: "Additional info",
          content: [
            {
              title: "Additional data",
              type: "add-data",
              isRequired: false,
              _id: "",
            },
          ],
          _id: "",
        },
      ],
    };

    console.log(data.document, "data");

    const formated = data.documents.flat();

    const additional = data.additional;
    if (additional) {
      formated.push(addField);
    }
    return { workflowId, stepId, formated, additional };
  },
  notFoundComponent: () => {
    return <p>step not found</p>;
  },
  component: LoanDocument,
});

function LoanDocument() {
  const navigate = useNavigate();
  const stepFormData = useStepFormStore((state: any) => state.stepFormData);
  const clearStepData = useStepFormStore((state: any) => state.clearFormData);
  const setStepData = useStepFormStore((state: any) => state.setStepFormData);
  const { name, setName, clearName } = useNameStore();
  const [draft, setDraft] = useState(false);
  const user: any = localStorage.getItem("user");
  const userId = JSON.parse(user);
  console.log(userId);
  // const setData = useStepFormStore((state:any) => state.setStepFormData)
  const formdata: any[] = [];
  const step: any = Route.useLoaderData();

  const defaultValues = { sections: step.formated[step.stepId].sections };

  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues,
  });
  const { control, handleSubmit, reset } = methods;
  const [workFlowName,setWorkFlowName]= useState('')
  const { append, fields, remove } = useFieldArray({
    control,
    name: "sections",
  });
  const formRef = useRef(null);
  
  

  const onSubmit = (data: any) => {
    console.log({ data });
    
    setName(workFlowName)
    const names= workFlowName != '' ? workFlowName :name
    if(draft){
      data.sections.map((content: any, index: any) => {
        formdata.push(content);
        // alert(JSON.stringify(content, null, 2));
      });
  
      console.log(formdata);
      // setForm(formdata);
      setStepData({
        stepId: step.stepId,
        templateId: step.formated[step.stepId]._id,
        title: step.formated[step.stepId].title,
        sections: formdata,
      });
      const newData = {
        stepId: step.stepId,
        templateId: step.formated[step.stepId]._id,
        title: step.formated[step.stepId].title,
        sections: formdata,
      };
  
  
      stepFormData.push(newData);
      console.log(draft)
      
      console.log(stepFormData, "demon");
      
      const documentData = {
        workflowTemplateId: step.workflowId,
        workflowName: names,
        userId: userId._id,
        reqDoc: stepFormData,
        addDoc: data.addDoc || [],
      };
     
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/initiate/workflows/draft-workflows",
        headers: {},
        withCredentials: true,
        data: documentData,
      };
      
      console.log(name)

      axios(config)
        .then(function (response) {
          console.log(documentData, "document");
        
          toast.success("Draft Saved!");
          clearStepData();
          clearName();
          setTimeout(function () {
            navigate({ to: "/assignedbyme" });
          }, 3000);
        })
        .catch(function (error) {
          console.log(documentData, "document");
          toast.error("Draft saving Unsuccessful! Please try again");
          clearStepData();
          clearName();
          setTimeout(function () {
            navigate({ to: "/assignedbyme" });
          }, 3000);
          console.log(error);
        });
      
    }else {
      console.log('hi')
    if (nextId) {
      location.replace(
        `/LoanDocument/${step.workflowId}/${Number(step.stepId) + 1}`
      );
    }

    data.sections.map((content: any, index: any) => {
      formdata.push(content);
      // alert(JSON.stringify(content, null, 2));
    });

    console.log(formdata);
    // setForm(formdata);
    setStepData({
      stepId: step.stepId,
      templateId: step.formated[step.stepId]._id,
      title: step.formated[step.stepId].title,
      sections: formdata,
    });
    const newData = {
      stepId: step.stepId,
      templateId: step.formated[step.stepId]._id,
      title: step.formated[step.stepId].title,
      sections: formdata,
    };


    stepFormData.push(newData);
    console.log(draft)
    
    console.log(stepFormData, "demon");
    if (!nextId) {

      const documentData = {
        workflowTemplateId: step.workflowId,
        workflowName: names,
        userId: userId._id,
        reqDoc: stepFormData,
        addDoc: data.addDoc || [],
      };

      console.log({ stepFormData });

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/initiate/workflows",
        headers: {},
        withCredentials: true,
        data: documentData,
      };

      axios(config)
        .then(function (response) {
          console.log(documentData, "document");
          console.log(JSON.stringify(response.data));
          toast.success("Successfully submited!");
          clearStepData();
          clearName();
          setTimeout(function () {
            navigate({ to: "/assignedbyme" });
          }, 3000);
        })
        .catch(function (error) {
          console.log(documentData, "document");
          toast.error("Please try again");
          clearStepData();
          clearName();
          setTimeout(function () {
            navigate({ to: "/assignedbyme" });
          }, 3000);
          console.log(error);
        });

      console.log(stepFormData, "persistent");
      // clearStepData();
    }
  }
  };

  const done = "border border-[#4A176D] bg-[#4A176D]  border-double";
  const current = "border border-[#4A176D] border-2";
  const next = "border border-[#C6C6C6]";

  function addMore() {
    append(step.formated[step.stepId].sections);
  }

  function removeSection(sectionIndex: number) {
    remove(sectionIndex);
  }
  let nextId: boolean;
  if (
    Number(step.stepId) < step.formated.length - 1 ||
    (Number(step.stepId) == step.formated.length && step.additonal)
  ) {
    nextId = true;
  } else {
    nextId = false;
  }

  
  return (
    <FormProvider {...methods}>
      <div className="mx-3 mb-10 ">
        <div className="flex">
          <SideBar2 />
          <div className="w-full flex flex-col ml-80 mr-8">
            <NavBar />
            <div className="mt-10">
              <div className="header flex justify-between">
                <h2 className="text-[#00B0AD] text-3xl font-bold">
                  Create Workflow
                </h2>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={` text-base px-6 py-2 border border-[#00B0AD] border-dotted text-[#00B0AD] font-semibold rounded-lg`}
                    // onClick={() => {
                    //   setDraft(true);
                    //   handleExternalButtonClick()
                    // }}
                  >
                    Save as Draft
                  </button>
                  <button
                    className={` text-base px-6 py-2 border border-[#DC251C] border-dotted text-[#DC251C] font-semibold rounded-lg`}
                    onClick={() => {
                      toast.error("Intitation Cancelled");
                      clearStepData();
                      clearName();
                      setTimeout(function () {
                        navigate({ to: "/assignedbyme" });
                      }, 2000);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
              <div className="steps-bar flex w-full justify-center my-10">
                {step.formated.map((item: any, index: any) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <div className="flex gap-0 items-center justify-center">
                      <div className="flex flex-col">
                        <a
                          href={`/LoanDocument/${step.workflowId}/${index}`}
                          className={`flex p-5 w-12 h-12 justify-center items-center rounded-full max-w-20 max-h-20 ${
                            index == step.stepId
                              ? current
                              : index < step.stepId
                              ? done
                              : next
                          }`}
                        >
                          <img
                            className="max-w-10 max-h-10"
                            src={`${
                              index < step.stepId
                                ? "/asset/icons/tick.svg"
                                : index == step.stepId
                                ? "/asset/icons/dot.svg"
                                : ""
                            }`}
                          />
                        </a>
                      </div>
                      {index < step.formated.length - 1 && (
                        <img src="/asset/icons/Line.svg" />
                      )}
                    </div>
                    <p className="max-w-[20px] text-[#6F6F6F] text-xs">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="text-[#4A176D] text-2xl font-bold">
                {step.formated[step.stepId].title}
              </h2>
              <div className="flex mt-10 gap-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 w-[75%]"
                >
                  <div className="form flex flex-col gap-4">
                    {fields?.map((item: any, parentIndex: number) => (
                      <div
                        key={parentIndex}
                        className="section1 flex flex-col p-6 border border-[#EFEFF4] gap-4 rounded-lg"
                      >
                        <h3
                          id={`${item.title}`}
                          className="text-[#00B0AD] text-xl font-bold"
                        >
                          {item.title}
                        </h3>
                        {step.stepId == 0 &&
                        <div>
                          <label> Workflow Name</label>
                        <input
                          onChange={(e)=>{
                            setWorkFlowName( e.target.value)
                          }}
                          className="w-full border border-[#EFEFF4] p-3 rounded-lg text-base"
                          required={true}
                          placeholder=""
                         
                        />
                          </div>
                        }
                     
                      
                        <hr className="bg-[#EFEFF4]" />
                        {item?.content.map((content: any, idx: number) => {
                          return (
                            <div className="" key={idx}>
                              <FormBuilder
                                stepId={step.stepId}
                                defaultValues={stepFormData}
                                {...content}
                                index={idx}
                                parentIndex={parentIndex}
                              />
                            </div>
                          );
                        })}
                        <div className="flex gap-3 ">
                          {item.multiple == true && (
                            <button
                              type="button"
                              className="flex w-full justify-center items-center border border-[#00B0AD] text-[#00B0AD] p-2"
                              onClick={() => addMore()}
                            >
                              <img src="/asset/icons/plus-black.svg" /> Add more
                            </button>
                          )}

                          {item.multiple == true && fields.length > 1 && (
                            <button
                              type="button"
                              className="flex w-full justify-center items-center border border-[#00B0AD] text-[#00B0AD] p-2"
                              onClick={() => removeSection(parentIndex)}
                            >
                              <img src="/asset/icons/plus-black.svg" /> Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className={` text-base px-6 py-2 border border-[#00B0AD] border-dotted text-[#00B0AD] font-semibold rounded-lg`}
                    onClick={() => {
                      setDraft(true);
                    
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="text-base px-6 py-2 self-end bg-[#00B0AD] text-white"
                  >
                    {nextId ? "continue" : "submit"}
                  </button>

                  <DevTool control={control} />
                </form>

                <div className="quick-acess flex flex-col p-4 border border-[#EFEFF4] w-[25%] gap-2 rounded-lg">
                  <p className="text-sm font-bold p-2">Quick Access</p>
                  {step.formated[step.stepId].sections.map(
                    (item: any, index: any) => (
                      <a
                        className="text-sm bg-[#E0F1F3] rounded-lg p-2 text-[#00B0AD]"
                        href={`#${item.title}`}
                      >
                        {item.title}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
