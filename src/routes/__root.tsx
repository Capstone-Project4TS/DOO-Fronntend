
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { useSession } from "../hooks/useSession";

export const Route = createRootRoute({
  component: () => {
    return <App />;
  },
});

function App(): JSX.Element { // Specify the return type as JSX.Element
  

  return (
    <>
      
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
