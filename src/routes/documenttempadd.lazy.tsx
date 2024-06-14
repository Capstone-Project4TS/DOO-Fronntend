import { Key, useEffect, useState } from "react";
import { Navigate, createFileRoute, useNavigate } from "@tanstack/react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldArray,
} from "formik";
import { FormBuilderTrial } from "../components/FormBuilderTrial";
import "react-dropdown/style.css";
import axios from "axios";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import {
  fetchCatag,
  fetchDepartment,
  fetchSubCatag,
} from "../services/api/fetchDataApi";
export const Route = createFileRoute("/documenttempadd")({
  component: () => <DocumentAddTemp />,
});

const addSection = [
  {
    sectionId: String(new Date().getTime()),
    title: "Sections",
    content: [
      { title: "title", type: "text" },
      {
        title: "type",
        type: "select",
        options: ["text", "textarea", "select", "upload", "date", "number"],
      },
      {
        title: "isRequired",
        type: "radio",
        options: ["true", "false"],
      },
      {
        title: "conditionLogic",
        type: "checkbox",
      },
    ],
  },
];
// const transformData = () => {};

function DocumentAddTemp() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [catagoryId, setCatagoryId] = useState("");
  const [department, setDepartment] = useState([]);
  const [depId, setDepId] = useState("");

  function getSubCategory(value: any) {
    setCatagoryId(value);
    fetchSubCatag(value).then((result) => {
      if (!result.isError) {
        setSubCategory(result.data);
      } else {
        toast.error("error fetching");
      }
    });
  }

  useEffect(() => {
    console.log(depId);
    getCategory();
  }, [depId]);

  function getCategory() {
    fetchCatag(depId).then((result) => {
      if (!result.isError) {
        setCategory(result.data);
      } else {
        console.log(result);
      }
    });
  }

  function getDepartment() {
    fetchDepartment().then((result) => {
      if (!result.isError) {
        setDepartment(result.data);
      } else {
        toast.error("error fetching");
      }
    });
  }

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="mx-3 mb-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <SideBar />
        <div className="w-full flex flex-col">
          <NavBar />
          <Formik
            initialValues={{
              content: addSection,
            }}
            onSubmit={async (values: { documentvalue: any }) => {
              console.log(values);
              await new Promise((r) => setTimeout(r, 500));
              // console.log(values);
              axios
                .post("http://localhost:5000/admin/documentTemplate", {
                  ...values.documentvalue,
                  depId: depId,
                  categoryId: catagoryId,
                })
                .then(function (response) {
                  console.log(response);
                  toast.success("Successfully submited!");
                  navigate({ to: "/documentemp" });
                })
                .catch(function (error) {
                  toast.error("Please try again");
                });
              console.log(values.documentvalue);
              // alert(JSON.stringify(values.documentvalue, null, 2));
            }}
          >
            {({ values }) => (
              <div className="">
                <div className="flex  mb-4">
                  <a href="/documentemp">
                    <img
                      src="/asset/icons/back-arrow.svg"
                      className="w-8 h-8 mr-2"
                    />
                  </a>
                  <button className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none">
                    {/* Adjust width and height */}
                    <h2 className="text-[#4A176D] text-3xl font-bold">
                      Add New Document Template
                    </h2>
                  </button>
                </div>

                <Form>
                  <div className="mb-6 rounded-lg overflow-hidden flex flex-col gap-10">
                    {/* section1 */}
                    <div className="flex flex-col gap-5 p-6 border border-[#EFEFF4] rounded-lg">
                      <h3 className="text-[#00B0AD] text-1xl font-bold">
                        Document Information
                      </h3>
                      {/* Document Name */}
                      <div className="mt-4">
                        <label
                          htmlFor="documentvalue.title"
                          className="text-sm w-full"
                        >
                          Document Name*
                        </label>
                        <Field
                          type="text"
                          name="documentvalue.title"
                          className="border rounded-md p-2 mt-1 w-full" // Set width to full and remove fixed width
                          required
                        />
                      </div>
                      {/* Department */}
                      <div className="mt-4">
                        <label
                          htmlFor="documentvalue.depId"
                          className="text-sm w-full"
                        >
                          Choose department*
                        </label>
                        <Field
                          name="documentvalue.depId"
                          as="select"
                          className="border rounded-md p-2 mt-1 w-full"
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
                        </Field>
                      </div>
                      {/* Document Type */}
                      <div className="flex w-full gap-3">
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">
                            Document Category*
                          </label>
                          <Field
                            name="documentvalue.categoryId"
                            as="select"
                            className="border rounded-md p-2 mt-1 w-full"
                            onChange={(e: { target: { value: any } }) =>
                              getSubCategory(e.target.value)
                            }
                            required
                          >
                            <option label="Select" value="" />
                            {category?.map((option: any, index) => (
                              <option
                                key={option}
                                label={option.name}
                                value={option._id}
                              />
                            ))}
                          </Field>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-2">
                          <label className="text-sm w-full">
                            Document Subcategory*
                          </label>
                          <Field
                            name="documentvalue.subCategoryId"
                            as="select"
                            className="border rounded-md p-2 mt-1 w-full"
                            required
                          >
                            <option label="Select" value="" />
                            {subCategory?.map((option: any, index) => (
                              <option
                                key={option}
                                label={option.name}
                                value={option._id}
                              />
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    {/* section2 */}

                    <div className="flex flex-col gap-5 p-6 border border-[#EFEFF4] rounded-sm ">
                      <div className="flex flex-col w-full gap-7">
                        <label className="text-[#00B0AD] text-xl font-bold">
                          Section Title*
                        </label>
                        <Field
                          type="text"
                          name={`documentvalue.sections[0].title`}
                          className="border rounded-md p-2 mt-1 w-full"
                          required
                        />
                        <FieldArray name="content">
                          {({ push, remove }) => (
                            <div>
                              {values.content.length > 0 &&
                                values.content.map(
                                  (
                                    contents: { content: any[] },
                                    idx: Key | null | undefined
                                  ) => {
                                    return (
                                      <>
                                        {console.log(contents)}
                                        <hr />
                                        <div className="flex justify-between   ">
                                          {/* <h3 className="text-[#00B0AD] text-xl font-bold">
                                      {addSection[0].title}
                                    </h3>  */}
                                          {idx > 0 && (
                                            <div onClick={() => remove(idx)}>
                                              <img
                                                src="/asset/icons/delete.svg"
                                                className="max-w-6"
                                              />
                                            </div>
                                          )}
                                        </div>

                                        <div key={idx}>
                                          {contents.content.map(
                                            (data: any, i: any) => (
                                              <FormBuilderTrial
                                                {...data}
                                                index={idx}
                                                // parentIndex={idx}
                                              />
                                            )
                                          )}
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                              <button
                                type="button"
                                className="flex items-center justify-center text-center w-full text-[#00B0AD] text-base border border-[#00B0AD] rounded-lg p-2"
                                onClick={() => {
                                  const newSection = {
                                    ...addSection[0],
                                    sectionId: String(new Date().getTime()),
                                  };
                                  try {
                                    push(newSection);
                                    console.log("Section added");
                                  } catch (error) {
                                    console.error(
                                      "Error occurred while adding section:",
                                      error
                                    );
                                  }
                                }}
                              >
                                Add More fields
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end items-center mt-6">
                    <button
                      type="submit"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-base py-2 px-4 rounded"
                    >
                      Publish Template
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default DocumentAddTemp;
