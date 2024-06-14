import { Link } from "@tanstack/react-router";
const UserTabs = () => {
  return (
    <div className="tab flex flex-col mb-10 gap-1">
    <div className="tabs flex gap-7">
      <div className="flex flex-col gap-3 items-center underline underline-offset-8">
      <Link to="/manage-user" className="text-[#667085] [&.active]:text-[#4A176D] [&.active]:font-bold ">
    All
  </Link>{" "}
      
      </div>
       <div className="flex flex-col gap-3 items-center underline underline-offset-8 ">
       <Link to="/invite-user" className="text-[#667085] [&.active]:text-[#4A176D] [&.active]:font-bold ">
       Invitation
  </Link>
      
       </div>
     
    </div>
    <hr className=" max-w-36 text-[#EFEFF4]"/>
  </div>
  )
}

export default UserTabs
