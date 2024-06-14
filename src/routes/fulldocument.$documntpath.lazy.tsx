import { useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/fulldocument/$documntpath")({
  component: () => <FullPagePdfView />,
});

const FullPagePdfView = () => {
  const params = Route.useParams();
  const documentpath = params.documntpath;
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={decodeURIComponent(documentpath)}
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default FullPagePdfView;