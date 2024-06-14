// routes/FolderHierarchyRoute.js

import { createFileRoute } from "@tanstack/react-router";
import FolderTreeContainer from "../components/FolderTreeContainer";
import NavBar2 from "../components/NavBar2";
import SideBar2 from '../components/SideBar2';
import UserName from "../components/UserName";

// Define a route for rendering the folder hierarchy
export const Route = createFileRoute("/FolderHierarchyRoute")({
  component: () => (
    <div className="mt-24 ml-80 mr-8">
      <UserName />
      <SideBar2/>
      <div className="mt-24">
        <h1 className="text-teal-500 mb-3 text-3xl font-bold">Repository</h1>
      <div className='border border-gray-400 border-opacity-20 px-6 py-6  mb-16 mt-10'>
        
      <FolderTreeContainer />
      </div>
      </div>
     
    </div>
  ),
});
