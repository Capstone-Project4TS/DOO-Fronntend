import React, { useEffect, useState } from 'react';
const user: any=  localStorage.getItem('user');
const userData = JSON.parse(user);
const NavBar2 = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="search-bar flex justify-between mt-4 p-3 fixed top-0 left-80 right-0 bg-white">
      <div className="flex border border-[#667085] px-3 py-2 rounded-lg w-72 h-8 justify-between">
        <input type="text" placeholder="Search something...." />
        <img src="/asset/icons/search.svg" />
      </div>

      <div className="flex gap-6 items-center">
        <img src="/asset/icons/notification.svg" className=" max-w-6 " />
        <hr className=" border border-[#EFEFF4] h-11" />
        <div className="flex gap-4 w-56 items-center ">
          {/* <img src="/asset/icons/avatar.svg" /> */}
          <div className= "w-10 h-10 rounded-full border bg-slate-400 text-white flex justify-center items-center">{userData.username.charAt(0)}</div>

          <div className="flex gap-2">
            <p className="">{userData.username}</p>
            <img src="/asset/icons/arrowDown.svg" className=" max-w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default NavBar2