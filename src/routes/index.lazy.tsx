import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: () => <Homepage />,
});

function Homepage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [transition, setTransition] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLogin(true);
    }, 500);

    if (login) {
      setTransition("animate-ping");

      setTimeout(() => {
        navigate({ to: "/login" });
      }, 900);
    }
  }, [login]);
  return (
    <div
      className={`w-screen h-screen ${transition} flex flex-col justify-center items-center`}
    >
      <img className=" w-96 h-96 " src="/asset/hibret-logo.svg" />
      <h1 className="text-3xl text-[#4A176D] -mt-20">
        Document Workflow Management and Approval System
      </h1>
    </div>
  );
}
