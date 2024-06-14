export const Card = ({ doc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Title:{doc.title}</h2>
      <p className="text-gray-600 mb-4">{doc.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{doc.type}</span>
        <span className="text-sm text-gray-500">{doc.status}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Workflow Path</h3>
        <ul>
          {doc.workflowPath.map((step, index) => (
            <li key={index} className="text-sm text-gray-600 mb-1">
              {step.role} - {step.status}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>Created At: {doc.createdAt}</p>
        <p>Updated At: {doc.updatedAt}</p>
      </div>
    </div>
  );
};
