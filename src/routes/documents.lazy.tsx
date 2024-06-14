import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateDocumentMutation } from "../services/queries/documentQuery";
import { useSession } from "../hooks/useSession";

export const Route = createFileRoute("/documents")({
  component: () => <Documents />,
});

function Documents() {
  const { getSession } = useSession();
  const {
    mutateAsync: createDocument,
    isSuccess,
    isError,
    isPending,
  } = useCreateDocumentMutation();
  const [formData, setFormData] = useState({
    title: "",
    type: "invoice",
    content: "",
    user: getSession()?.user.id,
  });

  const handleChange = (event: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    const res = await createDocument(formData);
    console.log(res);

    setFormData({
      title: "",
      type: "invoice",
      content: "",
    });
  };

  return (
    <div className="">
      <h1 className="text-3xl text-center">Document submission</h1>
      {isError && (
        <div className="text-center text-red-500">Error creating document</div>
      )}
      {isSuccess && (
        <div className="text-center text-green-500">
          Document created successfully
        </div>
      )}
      {isPending && (
        <div className="text-center text-blue-500">Creating document...</div>
      )}
      <form
        className="flex flex-col gap-4 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="invoice">Invoice</option>
            <option value="contract">Contract</option>
            <option value="report">Report</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows={4}
            placeholder="Enter content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
