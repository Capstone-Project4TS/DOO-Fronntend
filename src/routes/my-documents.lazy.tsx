import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetDocumentQuery } from "../services/queries/documentQuery";
import { useSession } from "../hooks/useSession";
import { Card } from "../components/Card";

export const Route = createLazyFileRoute("/my-documents")({
  component: () => <MyDocuments />,
});

function MyDocuments() {
  const { getSession } = useSession();
  const { data, isLoading, isError } = useGetDocumentQuery(
    getSession()?.user.id!
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching documents</div>;
  const doc = data.docs;

  return (
    <div>
      {doc && doc.length > 0 ? (
        doc.map((doc) => <Card key={doc.id} doc={doc} />)
      ) : (
        <div>You didn't submit any documents.</div>
      )}
    </div>
  );
}
